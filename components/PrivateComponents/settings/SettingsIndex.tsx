import React, { FC } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import AccountTap from "./AccountTap";
import Appearance from "./Appearance";
import NotificationTap from "./NotificationTap";

type Props = {};

const SettingsIndex: FC<Props> = ({}) => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <Tabs
        defaultValue="account"
        className="sm:w-[570px] lg:w-[655px] xl:w-full w-[360px] px-2 mx-auto"
      >
        <TabsList className="flex items-center justify-center gap-2">
          <TabsTrigger value="account" className={`sm:px-8 px-3 xl:px-8`}>
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance" className={`sm:px-8 px-3 xl:px-8`}>
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className={`sm:px-8 px-3 xl:px-8`}>
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTap />
        </TabsContent>
        <TabsContent value="appearance">
          <Appearance />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationTap />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsIndex;
