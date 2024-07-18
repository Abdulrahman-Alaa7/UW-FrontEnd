import { gql, DocumentNode } from "@apollo/client";

export const GET_ALL_USERS: DocumentNode = gql`
  query {
    getUsers {
      id
      name
      email
      gender
      createdAt
      role
      status
    }
  }
`;
