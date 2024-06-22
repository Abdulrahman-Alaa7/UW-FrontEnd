"use client";
import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "../../../navigation";
import { redirect } from "next/navigation";

export function UserNav() {
  const { user } = useSelector((state: any) => state.auth);

  const [logout, setLogout] = useState(false);
  const { isLoading, error, refetch } = useLogoutQuery(undefined, {
    skip: !logout,
    refetchOnMountOrArgChange: true,
  });

  const handleLogout = () => {
    setLogout(true);
  };

  useEffect(() => {
    if (logout && !isLoading && !error) {
      refetch();
      setLogout(false);
      toast.success("Logged out successfully");
      redirect("/");
    }
  }, [logout, isLoading, error]);

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/dashboard/profile`}>
              <DropdownMenuItem className=" cursor-pointer">
                <User size={20} className="mr-2" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/settings`}>
              <DropdownMenuItem className=" cursor-pointer">
                <Settings size={20} className="mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut size={20} className="mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
