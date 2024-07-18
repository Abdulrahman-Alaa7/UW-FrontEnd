import { Icons } from "../components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "All Users",
    href: "/dashboard/all-users",
    icon: "allUsers",
    label: "AllUsers",
  },
  {
    title: "Managers Area",
    href: "/dashboard/managers",
    icon: "managers",
    label: "managers",
  },
  {
    title: "Universites Area",
    href: "/dashboard/universities",
    icon: "university",
    label: "universities",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "settings",
  },
];
