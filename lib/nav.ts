import {
  Boxes,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FolderKanban,
  Globe,
  HardDrive,
  Home,
  Inbox,
  Users
} from "lucide-react";
import type { ComponentType } from "react";
import type { Role } from "@/lib/roles";

export type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export type NavGroup = {
  label: string;
  adminOnly?: boolean;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "WORKSPACE",
    items: [
      { label: "Home", href: "/dashboard", icon: Home },
      { label: "Inbox", href: "/requests/inbox", icon: Inbox },
      { label: "IT Support", href: "/it/cases", icon: HardDrive }
    ]
  },
  {
    label: "WEBSITE",
    items: [
      { label: "Overview", href: "/website/overview", icon: Globe },
      { label: "Pages", href: "/website/pages", icon: FolderKanban },
      { label: "Requests", href: "/website/requests", icon: Inbox }
    ]
  },
  {
    label: "MARKETING",
    items: [
      { label: "Overview", href: "/marketing/overview", icon: BriefcaseBusiness },
      { label: "Requests", href: "/marketing/requests", icon: Inbox }
    ]
  },
  {
    label: "BILLING",
    items: [
      { label: "Invoices", href: "/billing/invoices", icon: CreditCard },
      { label: "Plans", href: "/billing/plans", icon: Building2 }
    ]
  },
  {
    label: "ADMIN",
    adminOnly: true,
    items: [
      { label: "Overview", href: "/admin/overview", icon: Boxes },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Requests", href: "/admin/requests", icon: Inbox },
      { label: "Clients", href: "/admin/clients", icon: Building2 }
    ]
  }
];

export function getNavGroups(role: Role) {
  return navGroups.filter((group) => !group.adminOnly || role === "admin");
}
