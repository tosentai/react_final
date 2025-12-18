import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, LogOut, Package } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../hooks/useTheme";

export const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navLinks = [{ href: "/products", label: "Products" }];

    return (
        <div className="min-h-screen bg-background text-foreground">
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
                        <Link
                            to="/products"
                            className="font-semibold text-lg tracking-tight flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                        >
                            <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm">
                                <Package className="h-4 w-4" />
                            </div>
                            <span className="font-semibold">ShopList</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
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
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon size={18} />
                            ) : (
                                <Sun size={18} />
                            )}
                        </button>

                        <div className="h-5 w-px bg-border mx-1" />

                        <div className="flex items-center gap-3 text-sm">
                            <div className="hidden sm:flex flex-col items-end leading-tight">
                                <span className="font-medium text-foreground">
                                    {user?.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                    {user?.role}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
};
