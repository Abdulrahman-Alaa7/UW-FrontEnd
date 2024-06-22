import React from "react";
import Image from "next/image";
import Goal2 from "../../public/assets/Goal2.png";
import TodoList from "../../public/assets/todo-list.png";
import Calendar from "../../public/assets/Calendar1.png";
import spaceGoal from "../../public/assets/Goal.png";
import { useTranslations } from "next-intl";

type Props = {};

const HeroTime = (props: Props) => {
  const t = useTranslations("HeroTime");

  return (
    <div
      className={`relative flex justify-center items-center flex-col mt-20 p-2 dark:bg-background dark:border-b dark:border-b-[#9e9e9e29] pb-10 `}
    >
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 opacity-[0.6]">
        <Image
          src={spaceGoal}
          alt="Goal2"
          className={`w-[220px] h-[220px] 800px:w-[250px] 800px:h-[250px] `}
        />
      </div>
      <h2
        className={`1200px:text-[70px] 1100px:text-[60px]  1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold pt-20 pb-6 gradient-text tracking-tight text-center `}
      >
        {t("h2")}
      </h2>
      <p
        className={`w-[90%] 800px:w-[80%] 1300px:w-[60%] font-[400] mx-auto  pb-12 text-[#666] leading-loose text-[18px] text-center dark:text-[#939db6]`}
      >
        {t("p")}
      </p>
      <div className={`flex flex-wrap justify-center items-center gap-4`}>
        <div
          className={`bg-gradient-to-r from-gray-900 to-rose-900 p-8 w-full 900px:w-[400px] h-[350px] rounded-3xl`}
        >
          <h2 className={`text-[#fff] text-3xl`}>{t("foucs")}</h2>
          <div className="flex justify-center items-center mt-4">
            <Image src={Goal2} alt="Goal2" className={`w-[250px] h-[250px]`} />
          </div>
        </div>
        <div
          className={`bg-gradient-to-r from-gray-900 to-blue-900 p-8 w-full 900px:w-[400px] h-[350px] rounded-3xl`}
        >
          <h2 className={`text-[#fff] text-3xl`}>{t("todo")}</h2>
          <div className="flex justify-center items-center mt-4">
            <Image
              src={TodoList}
              alt="TodoList"
              className={`w-[250px] h-[250px]`}
            />
          </div>
        </div>
        <div
          className={`bg-gradient-to-r from-gray-900 to-zinc-800 p-8 w-full 900px:w-[400px] h-[350px] rounded-3xl`}
        >
          <h2 className={`text-[#fff] text-3xl`}>{t("calendar")}</h2>
          <div className="flex justify-center items-center mt-4">
            <Image
              src={Calendar}
              alt="Calendar"
              className={`w-[250px] h-[250px]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTime;
