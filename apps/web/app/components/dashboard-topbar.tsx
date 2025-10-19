"use client";

import { useSession, signOut } from "next-auth/react"; // Import signOut
import { Topbar } from "ui";

export function DashboardTopbar() {
  const { data: session } = useSession();

  const userName = session?.user?.name;
  const userInitial = userName?.[0].toUpperCase();
const userEmail = session?.user?.email;
  // Function to handle the sign-out action
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Topbar
      userName={userName}
      userInitial={userInitial}
      userEmail={userEmail}
      onSignOut={handleSignOut} // Pass the sign-out function as a prop
    />
  );
}