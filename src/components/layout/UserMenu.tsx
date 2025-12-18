import { LogOut } from "lucide-react";
import type { UserMenuProps } from "../../lib/layoutTypes";

export const UserMenu = ({ user, onLogout }: UserMenuProps) => {
    return (
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
                onClick={onLogout}
                className="p-2.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                title="Logout"
            >
                <LogOut size={18} />
            </button>
        </div>
    );
};
