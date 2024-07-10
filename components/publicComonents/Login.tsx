"use client";
import React, { useState } from "react";
import { Drawer, DrawerTrigger } from "../../components/ui/drawer";
import { useTranslations } from "next-intl";
import LoginContent from "./LoginContent";
import ForgotPasswordContent from "./ForgotPasswordContent";

type Props = {
  component: string;
};

const Login = ({ component }: Props) => {
  const t = useTranslations("Header");
  const tHero = useTranslations("Hero");
  const [activeCom, setActiveCom] = useState("Login");

  return (
    <div>
      <Drawer>
        <DrawerTrigger
          className={`${
            component !== "Login" &&
            "!w-[350px] 800px:!w-[450px]  !rounded-full !z-10"
          } inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 `}
        >
          {component === "Login" ? `${t("SignIn")}` : `${tHero("button")}`}
        </DrawerTrigger>
        {activeCom === "Login" && <LoginContent setActiveCom={setActiveCom} />}
        {activeCom === "ForgotPassword" && (
          <ForgotPasswordContent setActiveCom={setActiveCom} />
        )}
      </Drawer>
    </div>
  );
};

export default Login;
