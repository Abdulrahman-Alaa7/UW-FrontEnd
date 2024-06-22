import React from "react";
import Heading from "../../../../utils/Heading";
import BreadCrumb from "../../../../../components/BreadCrumb";
import { HeadPage } from "../../../../../components/HeadPage";
import { Separator } from "../../../../../components/ui/separator";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import { ProfileTap } from "../../../../../components/PrivateComponents/ProfileTap";

type Props = {};

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];

const Page = (props: Props) => {
  return (
    <>
      <Heading
        title="Profile"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <HeadPage
              title={`Profile`}
              description={`This is how others will see you on the site.`}
            />
          </div>
          <Separator />
          <ProfileTap />
        </div>
      </ScrollArea>
    </>
  );
};

export default Page;
