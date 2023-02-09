import { useTheme } from '@/pages/hooks/useTheme';
import React, { PropsWithChildren } from 'react';
import { DarkModeContext, SetDarkModeContext } from './context';

export default function DarkModeContextProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useTheme();

  const updateClass = () => {
    const colorTheme = theme === "dark" ? "light" : "dark";
    
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    setTheme(theme);
  }

  function toggleTheme() {
    updateClass();
    if (theme === 'dark') {
        return 'light';
    }
    return 'dark';
}

  return (
      <DarkModeContext.Provider value={theme}>
          <SetDarkModeContext.Provider value={() => setTheme(toggleTheme)}>
              {children}
          </SetDarkModeContext.Provider>
      </DarkModeContext.Provider>
  );
}