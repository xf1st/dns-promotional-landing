
import React from 'react';
import { Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Компонент скрыт, так как темная тема отключена
const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  
  // Скрываем кнопку полностью, возвращая null
  return null;
  
  /* Оригинальный код (отключен)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 bg-white dark:bg-secondary border-gray-200 dark:border-gray-600"
          >
            <Sun className="h-5 w-5 text-yellow-500" />
            <span className="sr-only">Переключить тему</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Включить светлую тему</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  */
};

export default ThemeToggle;
