import React from "react";
import Image from "next/image";
import CloudData from "../../public/assets/cloud-data.png";
import OnlineDocument from "../../public/assets/Online document.gif";
import { useTranslations } from "next-intl";

type Props = {};

const HeroDocuments = (props: Props) => {
  const t = useTranslations("HeroDocuments");

  return (
    <div className=" dark:bg-background flex items-center 800px:justify-between justify-center 900px:flex-row flex-col gap-4 px-2 py-10 900px:px-20  dark:border-b dark:border-b-[#9e9e9e29] ">
      <div className={`900px:w-[45%] w-[100%] px-2`}>
        <div className="flex items-center justify-center">
          <Image
            src={CloudData}
            alt="CloudData"
            className={`w-[230px] h-[230px] `}
          />
        </div>
        <h2
          className={`text-[30px] font-bold pt-4 pb-3 gradient-text tracking-tight px-2 `}
        >
          {t("h2")}
        </h2>
        <p
          className={`font-[400] text-[#666] leading-loose text-[18px] px-2 dark:text-[#939db6]`}
        >
          {t("p")}
        </p>
      </div>
      <div
        className={`900px:w-[50%] w-[100%] flex justify-center items-center`}
      >
        <Image
          src={OnlineDocument}
          alt="OnlineDocument"
          className={`w-[400px] h-[400px] 1300px:w-[600px] 1300px:h-[600px] 1000px:w-[500px] 1000px:h-[500px] rounded-3xl`}
          unoptimized
        />
      </div>
    </div>
  );
};

export default HeroDocuments;
