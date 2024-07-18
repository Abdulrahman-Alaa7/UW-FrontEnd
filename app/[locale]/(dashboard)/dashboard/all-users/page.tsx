"use client";
import React from "react";
import BreadCrumb from "../../../../../components/BreadCrumb";
import Heading from "../../../../utils/Heading";
import { Separator } from "../../../../../components/ui/separator";
import { HeadPage } from "../../../../../components/HeadPage";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import { CardContent } from "../../../../../components/ui/card";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../../../graphql/actions/queries/GetAllUsers";
import { DataManagerTable } from "../../../../../components/PrivateComponents/managerCom/tables/managerTable/components/t-manager-table";
import { tManagerColumns } from "../../../../../components/PrivateComponents/managerCom/tables/managerTable/components/t-manager-columns";
import MainLoading from "../../../../../components/ui/main-loading";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const Page = ({ searchParams }: paramsProps) => {
  const breadcrumbItems = [
    { title: "All Users", link: "/dashboard/all-users" },
  ];

  const { data, loading: loadingUsers } = useQuery(GET_ALL_USERS);

  const allUsers = data?.getUsers;

  return (
    <>
      <Heading
        title="All Users Area"
        description="Platform to help students."
        keywords="ELearning, LMS and more."
      />
      <ScrollArea className="h-full fadeRight">
        <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <HeadPage
              title={`All users ${!loadingUsers && `(${allUsers?.length})`}`}
              description="Manage All users from here."
            />
          </div>
          <Separator />
        </div>
        <CardContent className="w-[390px] sm:w-[550px]  xl:w-full mx-auto ">
          {loadingUsers ? (
            <div className="flex justify-center items-center">
              <MainLoading />
            </div>
          ) : (
            <DataManagerTable data={allUsers} columns={tManagerColumns} />
          )}
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default Page;
