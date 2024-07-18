import { gql, DocumentNode } from "@apollo/client";

export const GET_USER_BY_ID: DocumentNode = gql`
  query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      user {
        id
        name
        email
        gender
        status
        role
      }
    }
  }
`;
