import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import Cookies from "js-cookie";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      accesstoken: Cookies.get("access_token"),
      refreshtoken: Cookies.get("refresh_token"),
      "Apollo-Require-Preflight": "true",
    },
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: authMiddleware.concat(uploadLink),
  cache: new InMemoryCache(),
});
