import { Link } from "react-router-dom";

export const NotFound = () => (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <Link to="/products" className="text-blue-600 hover:underline">
            Go to Products
        </Link>
    </div>
);
