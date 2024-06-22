import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { BiSolidNotification } from "react-icons/bi";

type Props = {};

const Notification = (props: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded-full hover:bg-muted transition-all ">
          <Bell size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 w-[350px] mx-2 h-[350px] overflow-auto">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={`flex items-center gap-6 border-b py-3`}>
            <div className={`p-2 bg-muted rounded-lg font-bold text-[18px]`}>
              <BiSolidNotification size={22} />
            </div>
            <div>
              <h3 className={`font-semibold `}>Congratulations!</h3>
              <p className="py-1 text-[12px] text-muted-foreground">
                8 munutes ago
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
