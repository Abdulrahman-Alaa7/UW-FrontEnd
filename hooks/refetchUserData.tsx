"use client";
import { client } from "../graphql/gql.setup";
import { GET_USER } from "../graphql/actions/getUser.action";

export const refetchUserData = async () => {
  await client.refetchQueries({
    include: [GET_USER],
  });
};
