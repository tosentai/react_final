import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Layout } from "../components/Layout";
import { Login } from "../pages/Login";
import { ProductList } from "../pages/ProductList";
import { ProductForm } from "../pages/ProductForm";
import { NotFound } from "../pages/NotFound";
import type { Role } from "../types";

const PrivateRoute = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>;

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

const RoleRoute = ({ roles }: { roles: Role[] }) => {
    const { user } = useAuth();
    if (user && !roles.includes(user.role)) {
        return <Navigate to="/products" replace />;
    }
    return <Outlet />;
};

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Navigate to="/products" replace />}
                    />
                    <Route path="/products" element={<ProductList />} />
                    <Route
                        path="/products/:id"
                        element={<div>Product Detail</div>}
                    />

                    <Route element={<RoleRoute roles={["admin"]} />}>
                        <Route path="/products/new" element={<ProductForm />} />
                        <Route
                            path="/products/:id/edit"
                            element={<ProductForm />}
                        />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
