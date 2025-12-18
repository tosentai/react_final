import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Header } from "./layout/Header";

export const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header user={user} onLogout={handleLogout} />

            <main className="container mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
};
