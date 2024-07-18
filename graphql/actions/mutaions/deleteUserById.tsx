import { gql, DocumentNode } from "@apollo/client";

export const DELETE_USER_BY_ID: DocumentNode = gql`
  mutation DeleteUserById($userId: String!) {
    deleteUserById(userId: $userId) {
      message
    }
  }
`;
