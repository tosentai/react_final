/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package, Mail, Lock, Moon, Sun } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Password required"),
});

export const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/products";

    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved as "light" | "dark";

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, navigate, from]);

    const onSubmit = async (data: any) => {
        try {
            await login(data.email);
        } catch (error) {
            alert("Invalid credentials. Try: admin@test.com");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <button
                onClick={toggleTheme}
                className="fixed top-6 right-6 p-3 rounded-full bg-card border shadow-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 z-50"
                aria-label="Toggle theme"
            >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg shadow-primary/20 mb-4">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                        Welcome back
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-card rounded-2xl border shadow-sm p-8">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-muted-foreground"
                                    placeholder="admin@test.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-destructive text-xs mt-2 ml-1">
                                    {String(errors.email.message)}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    {...register("password")}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-muted-foreground"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-destructive text-xs mt-2 ml-1">
                                    {String(errors.password.message)}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-6 py-3 px-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/30 active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground bg-secondary/50 rounded-xl py-3 px-4">
                        Demo accounts:{" "}
                        <span className="font-medium text-foreground">
                            admin@test.com
                        </span>{" "}
                        or{" "}
                        <span className="font-medium text-foreground">
                            user@test.com
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
