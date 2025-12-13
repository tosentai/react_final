/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useState, useEffect } from "react";
import { type User } from "../types";

const MOCK_USERS: User[] = [
    { id: "1", email: "admin@test.com", name: "Admin User", role: "admin" },
    { id: "2", email: "user@test.com", name: "Simple User", role: "user" },
];

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("shop_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundUser = MOCK_USERS.find((u) => u.email === email);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("shop_user", JSON.stringify(foundUser));
        } else {
            throw new Error("User not found");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("shop_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
