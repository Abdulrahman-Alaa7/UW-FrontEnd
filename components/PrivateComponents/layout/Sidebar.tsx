"use client";
import React, { useState } from "react";
import { DashboardNav } from "../layout/DashboardNav";
import { navItems } from "../../../constants/data";
import { cn } from "../../../lib/utils";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "../../../hooks/useSidebar";
import { Button } from "../../../components/ui/button";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r pt-20 md:block`,
        status && "duration-500",
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <Button
        variant={`outline`}
        className="!px-2 absolute left-3 top-[64px] cursor-pointer rounded-md border bg-background text-foreground flex justify-center items-center"
        onClick={handleToggle}
      >
        <ChevronLeft
          className={cn("", isMinimized && "-rotate-180")}
          size={25}
        />
      </Button>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
