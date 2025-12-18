import { Package } from "lucide-react";

export const LoginHeader = () => {
    return (
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
    );
};
