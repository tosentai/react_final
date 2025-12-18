import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import { UserMenu } from "./UserMenu";
import { useTheme } from "../../hooks/useTheme";
import type { HeaderProps } from "../../lib/layoutTypes";

const navLinks = [{ href: "/products", label: "Products" }];

export const Header = ({ user, onLogout }: HeaderProps) => {
    const { theme } = useTheme();

    return (
        <header
            className="sticky top-0 z-50 w-full border-b backdrop-blur-xl backdrop-saturate-150"
            style={{
                backgroundColor:
                    theme === "light"
                        ? "rgba(255, 255, 255, 0.95)"
                        : "rgba(0, 0, 0, 0.8)",
            }}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Logo />
                    <Navigation links={navLinks} />
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggleButton className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200" />

                    <div className="h-5 w-px bg-border mx-1" />

                    <UserMenu user={user} onLogout={onLogout} />
                </div>
            </div>
        </header>
    );
};
