export const getEnv = (key: string, defaultValue: string = ""): string => {
  if (typeof window !== "undefined" && (window as any)._env_ && (window as any)._env_[key]) {
    return (window as any)._env_[key];
  }
  return process.env[key] || defaultValue;
};
