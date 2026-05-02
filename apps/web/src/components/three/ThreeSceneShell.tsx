import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { canUseWebGL } from './webgl';

type Props = {
  fallback: ReactNode;
  label: string;
  initScene?: (canvas: HTMLCanvasElement) => void | (() => void);
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  if (typeof window.matchMedia !== 'function') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const ThreeSceneShell: FC<Props> = ({ fallback, label, initScene }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);
  const [canRender, setCanRender] = useState<boolean>(
    () => canUseWebGL() && !prefersReducedMotion(),
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCanRender(canUseWebGL() && !media.matches);

    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => {
        media.removeEventListener('change', update);
      };
    }

    media.addListener(update);
    return () => {
      media.removeListener(update);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canRender || hasError || !canvas || !initScene) {
      return undefined;
    }

    let disposed = false;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;

      if (disposed) return;

      try {
        cleanupRef.current = initScene(canvas) ?? undefined;
      } catch {
        if (!disposed) {
          setHasError(true);
        }
      }
    });

    return () => {
      disposed = true;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }

      cleanupRef.current = undefined;
    };
  }, [canRender, hasError, initScene]);

  if (!canRender || hasError) {
    return <>{fallback}</>;
  }

  return (
    <div className="three-scene-shell" aria-label={label}>
      <canvas ref={canvasRef} className="three-scene-shell-canvas" />
    </div>
  );
};

export { ThreeSceneShell };
