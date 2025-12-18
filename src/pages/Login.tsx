/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import { LoginHeader } from "../components/auth/LoginHeader";
import { LoginFormField } from "../components/auth/LoginFormField";
import { LoginSubmitButton } from "../components/auth/LoginSubmitButton";
import { LoginDemoAccounts } from "../components/auth/LoginDemoAccounts";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Password required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/products";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, navigate, from]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email);
        } catch (error) {
            alert("Invalid credentials. Try: admin@test.com");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <ThemeToggleButton className="fixed top-6 right-6 z-50" />

            <div className="w-full max-w-md">
                <LoginHeader />

                <div className="bg-card rounded-2xl border shadow-sm p-8">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <LoginFormField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="admin@test.com"
                            icon={Mail}
                            register={register}
                            error={errors.email}
                        />

                        <LoginFormField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            icon={Lock}
                            register={register}
                            error={errors.password}
                        />

                        <LoginSubmitButton isSubmitting={isSubmitting} />
                    </form>
                </div>

                <LoginDemoAccounts />
            </div>
        </div>
    );
};
