"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sidebar } from "ui";
import { LayoutDashboard, CheckSquare, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type DashboardSidebarProps = {
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
};

const NextLinkWrapper = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => <Link href={href} className={className}>{children}</Link>;

export function DashboardSidebar({ theme, onToggleTheme }: DashboardSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const handleSignOut = () => signOut({ callbackUrl: "/login" });
  const handleRefresh = () => window.location.reload();

  return (
    <Sidebar
      links={links}
      pathname={pathname}
      LinkComponent={NextLinkWrapper}
      onSignOut={handleSignOut}
      onRefresh={handleRefresh}
                 // ✅ Now allowed
      // ✅ Now allowed
    />
  );
}
