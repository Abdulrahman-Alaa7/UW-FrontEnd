"use client";
import React, { FC, useEffect, useState } from "react";
import { Link } from "../navigation";
import { ModeToggle } from "../app/utils/ModeToggle";
import LangMenu from "../app/utils/LangMenu";
import Login from "./publicComonents/Login";
import { useTranslations } from "next-intl";
import { UserNav } from "./PrivateComponents/layout/UserNav";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Notification from "./PrivateComponents/layout/Notification";
import Image from "next/image";
import LogoLight from "../public/assets/logo-light.png";
import LogoDark from "../public/assets/logo-dark.png";
import useUser from "../hooks/useUser";

type Props = {};

const HeaderPub: FC<Props> = () => {
  const { user, loading } = useUser();
  const [signedIn, setsignedIn] = useState(false);
  const t = useTranslations("Header");
  const tHero = useTranslations("Hero");
  const tLogin = useTranslations("Login");

  useEffect(() => {
    if (!loading) {
      setsignedIn(!!user);
    }
  }, [loading, user]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <nav
        className={`h-[54px] border-b dark:border-[#ffffff1c]  z-[80px] dark:shadow`}
      >
        <div className="w-[95%] 800px:w-[92%] mx-auto  h-full">
          <div className="w-full  flex items-center justify-between px-2">
            <div>
              <Link href={`/`}>
                <Image
                  src={LogoDark}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="hidden p-1 dark:!flex"
                />
                <Image
                  src={LogoLight}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="flex p-1 dark:!hidden"
                />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 800px:gap-2">
              {signedIn ? (
                <>
                  <Link href={`/dashboard`}>
                    <Button
                      variant={`outline`}
                      className={`flex justify-center items-center gap-1`}
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Button>
                  </Link>
                  <ModeToggle />
                  <Notification />
                  <UserNav />
                </>
              ) : (
                <>
                  {" "}
                  <ModeToggle />
                  <LangMenu />
                  <Login component="Login" />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderPub;
