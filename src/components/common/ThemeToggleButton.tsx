import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";
import type { ThemeToggleButtonProps } from "../../lib/commonTypes";

export const ThemeToggleButton = ({ className }: ThemeToggleButtonProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-3 rounded-full bg-card border shadow-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200",
                className
            )}
            aria-label="Toggle theme"
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};
