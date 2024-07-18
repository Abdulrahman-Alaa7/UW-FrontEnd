"use client";
import { client } from "../graphql/gql.setup";
import { GET_ALL_USERS } from "../graphql/actions/queries/GetAllUsers";

export const refetchAllUserData = async () => {
  await client.refetchQueries({
    include: [GET_ALL_USERS],
  });
};
