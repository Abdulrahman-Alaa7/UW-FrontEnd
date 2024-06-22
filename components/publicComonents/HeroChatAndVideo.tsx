import React from "react";
import Image from "next/image";
import GroupChat from "../../public/assets/Group video.gif";
import Chat from "../../public/assets/chat.png";
import VideoCamera from "../../public/assets/video-camera.png";
import { useTranslations } from "next-intl";

type Props = {};

const HeroChatAndVideo = (props: Props) => {
  const t = useTranslations("HeroChatAndVideo");

  return (
    <div className=" bg-[#f5f5ff] dark:bg-background flex items-center 800px:justify-between justify-center 800px:flex-row flex-col gap-4 px-2 py-10 dark:border-b dark:border-b-[#9e9e9e29] ">
      <div
        className={`800px:w-[50%] w-[100%] flex justify-center items-center`}
      >
        <Image
          src={GroupChat}
          alt="GroupChat"
          className={`w-[400px] h-[400px] 1300px:w-[600px] 1300px:h-[600px] 1000px:w-[500px] 1000px:h-[500px] rounded-3xl`}
          unoptimized
        />
      </div>
      <div className={`800px:w-[45%] w-[100%] px-2`}>
        <h2
          className={` font-bold pt-8 pb-6 gradient-text tracking-tight px-2  800px:text-[40px] 600px:text-[35px] text-[35px] `}
        >
          {t("h2")}
        </h2>
        <p
          className={`font-[400] text-[#666] leading-loose text-[18px] px-2 dark:text-[#939db6]`}
        >
          {t("p")}
        </p>
        <div className="mt-3 flex items-center justify-center">
          <Image src={Chat} alt="Chat" className={`w-[120px] h-[120px] `} />
          <Image
            src={VideoCamera}
            alt="VideoCamera"
            className={`w-[120px] h-[120px] `}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroChatAndVideo;
