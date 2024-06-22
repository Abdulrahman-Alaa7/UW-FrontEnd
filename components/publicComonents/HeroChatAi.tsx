import React from "react";
import AIChat from "../../public/assets/Ai-chat.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {};

const HeroChatAi = (props: Props) => {
  const t = useTranslations("HeroChatAI");

  return (
    <div
      className={`bg-[#f5f5ff] dark:bg-background flex items-center 800px:justify-between justify-center 800px:flex-row flex-col gap-4 px-2 py-8 800px:p-20 dark:border-b dark:border-b-[#9e9e9e29]`}
    >
      <div className={`800px:w-[45%] w-[100%] px-2`}>
        <h2
          className={`text-[50px] font-bold pt-8 pb-3 gradient-text tracking-tight animate-typing overflow-hidden whitespace-nowrap `}
        >
          {t("h2")}
        </h2>
        <p
          className={`font-[400] text-[#666] leading-loose text-[18px] dark:text-[#939db6]`}
        >
          {t("p")}
        </p>
        <div className="mt-0 800px:mt-20 flex items-center justify-center">
          <div className="relative mx-auto h-10 w-10 animate-bounce">
            <div className="mx-auto w-8 h-8 800px:h-16 800px:w-16 animate-pulse rounded-full bg-gray-400"></div>
            <span className="absolute flex h-5 w-5 animate-spin">
              <span className="800px:h-4 800px:w-4 w-3 h-3 rounded-full bg-gray-400">
                {" "}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div
        className={`800px:w-[50%] w-[100%] flex justify-center items-center`}
      >
        <Image
          src={AIChat}
          alt="AIChat"
          className={`w-[400px] h-[400px] 1300px:w-[600px] 1300px:h-[600px] 1000px:w-[500px] 1000px:h-[500px] rounded-3xl`}
        />
      </div>
    </div>
  );
};

export default HeroChatAi;
