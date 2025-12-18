import type { LoginSubmitButtonProps } from "../../lib/authTypes";

export const LoginSubmitButton = ({ isSubmitting }: LoginSubmitButtonProps) => {
    return (
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
    );
};
