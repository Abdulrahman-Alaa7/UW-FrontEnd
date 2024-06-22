"use client";
import React, { FC } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MdLanguage } from "react-icons/md";
import { Link, usePathname, useRouter } from "../../navigation";

type Props = {
  settings?: boolean;
};

const LangMenu: FC<Props> = ({ settings }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={`${settings ? "outline" : "ghost"}`} size="icon">
            <MdLanguage size={20} className={`text-black dark:text-white `} />
            <span className="sr-only">Language Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className={`mt-2`}>
          <DropdownMenuItem
            onClick={() => router.push(pathname, { locale: "en" })}
            className="text-center block"
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(pathname, { locale: "ar" })}
            className="text-center block"
          >
            عربي
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LangMenu;
