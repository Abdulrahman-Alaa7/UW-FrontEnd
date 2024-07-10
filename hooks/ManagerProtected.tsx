"use client";

import React from "react";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function ManagerProtected({ children }: ProtectedProps) {
  let user: any = false;

  if (user) {
    const isManager = user?.role === "manager";
    return isManager ? children : redirect("/");
  }
}
