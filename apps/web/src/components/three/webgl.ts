const canUseWebGL = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') ?? canvas.getContext('webgl2');

    if (!context) return false;

    const loseContext = context.getExtension('WEBGL_lose_context');
    loseContext?.loseContext();

    return true;
  } catch {
    return false;
  }
};

export { canUseWebGL };
