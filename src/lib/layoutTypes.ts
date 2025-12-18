import type { User } from ".";

export interface NavLink {
    href: string;
    label: string;
}

export interface NavigationProps {
    links: NavLink[];
}

export interface UserMenuProps {
    user: User | null;
    onLogout: () => void;
}

export interface HeaderProps {
    user: User | null;
    onLogout: () => void;
}
