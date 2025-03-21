
import { useState, useEffect, createContext, useContext } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Всегда используем светлую тему
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add('light');
    
    localStorage.setItem('theme', 'light');
  }, []);

  // Функция toggleTheme остается для совместимости, но ничего не меняет
  const toggleTheme = () => {
    // Ничего не делаем, всегда светлая тема
    console.log('Тёмная тема отключена');
  };

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
