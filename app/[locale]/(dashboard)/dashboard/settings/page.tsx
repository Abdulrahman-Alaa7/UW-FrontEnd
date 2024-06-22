import React from "react";
import Heading from "../../../../utils/Heading";
import BreadCrumb from "../../../../../components/BreadCrumb";
import { HeadPage } from "../../../../../components/HeadPage";
import { Separator } from "../../../../../components/ui/separator";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import SettingsIndex from "../../../../../components/PrivateComponents/settings/SettingsIndex";

type Props = {};

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/settings" }];

const Page = (props: Props) => {
  return (
    <>
      <Heading
        title="Settings"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <HeadPage
              title={`Settings`}
              description={`Manage your account settings and set e-mail preferences.`}
            />
          </div>
          <Separator />
          <SettingsIndex />
        </div>
      </ScrollArea>
    </>
  );
};

export default Page;
