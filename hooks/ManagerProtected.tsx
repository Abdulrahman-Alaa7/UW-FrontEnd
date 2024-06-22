"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function ManagerProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    const isManager = user?.role === "manager";
    return isManager ? children : redirect("/");
  }
}
