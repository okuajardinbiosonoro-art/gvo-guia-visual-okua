import type { FC, ReactNode } from 'react';
import { ProgressTracker } from './ProgressTracker';
import { GuideAvatar } from './GuideAvatar';
import { getGuideName } from '../state/journey';

interface LayoutProps {
  children: ReactNode;
  showProgress?: boolean;
  currentStep?: number | null;
}

export const Layout: FC<LayoutProps> = ({
  children,
  showProgress = false,
  currentStep = null,
}) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <span className="layout-brand">GVO</span>
        <div className="layout-guide-indicator">
          <GuideAvatar size="sm" state="idle" />
          <span className="layout-guide-name">{getGuideName()}</span>
        </div>
      </header>

      {showProgress && (
        <div className="layout-progress">
          <ProgressTracker currentStep={currentStep} />
        </div>
      )}

      <main className="layout-main">{children}</main>
    </div>
  );
};
