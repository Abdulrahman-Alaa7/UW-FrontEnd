import React from "react";
import { useTranslations } from "next-intl";

type Props = {};

const Footer = (props: Props) => {
  const t = useTranslations("Footer");

  return (
    <div
      className={`text-center p-4 relative overflow-hidden bg-[#f5f5ff] dark:bg-background`}
    >
      <div
        className={`py-4 px-6 rounded-full bg-[#fff] dark:bg-background w-fit mx-auto border border-[#ccc] dark:border-[#9e9e9e29] text-[14px] 500px:text-[16px]`}
      >
        {t("copyright")} &copy; {new Date().getFullYear()} {t("allrights")}
      </div>
    </div>
  );
};

export default Footer;
