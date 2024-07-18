"use client";
import React from "react";
import BreadCrumb from "../../../../../components/BreadCrumb";
import { buttonVariants } from "../../../../../components/ui/button";
import Heading from "../../../../utils/Heading";
import { Separator } from "../../../../../components/ui/separator";
import { cn } from "../../../../../lib/utils";
import { Plus } from "lucide-react";
import { Link } from "../../../../../navigation";
import { HeadPage } from "../../../../../components/HeadPage";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import { CardContent } from "../../../../../components/ui/card";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../../../graphql/actions/queries/GetAllUsers";
import { DataManagerTable } from "../../../../../components/PrivateComponents/managerCom/tables/managerTable/components/t-manager-table";
import { tManagerColumns } from "../../../../../components/PrivateComponents/managerCom/tables/managerTable/components/t-manager-columns";
import MainLoading from "../../../../../components/ui/main-loading";
const breadcrumbItems = [{ title: "Managers", link: "/dashboard/managers" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Page = ({ searchParams }: paramsProps) => {
  const { data, loading: loadingUsers } = useQuery(GET_ALL_USERS);

  const allUsers = data?.getUsers;

  const managersUsers = allUsers?.filter(
    (user: any) => user.role === "Manager"
  );

  return (
    <>
      <Heading
        title="Managers Area"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full fadeRight">
        <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <HeadPage
              title={`Managers ${
                !loadingUsers && `(${managersUsers?.length})`
              } `}
              description="Manage Managers from here."
            />

            <Link
              href={"/dashboard/managers/new"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
        </div>

        <CardContent className="w-[390px] sm:w-[550px]  xl:w-full mx-auto">
          {loadingUsers ? (
            <div className="flex justify-center items-center">
              <MainLoading />
            </div>
          ) : (
            <DataManagerTable data={managersUsers} columns={tManagerColumns} />
          )}
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default Page;
