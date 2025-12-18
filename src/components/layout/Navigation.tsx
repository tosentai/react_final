import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import type { NavigationProps } from "../../lib/layoutTypes";

export const Navigation = ({ links }: NavigationProps) => {
    const location = useLocation();

    return (
        <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
                <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                        location.pathname === link.href
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};
