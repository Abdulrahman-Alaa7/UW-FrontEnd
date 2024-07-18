import { gql, DocumentNode } from "@apollo/client";

export const UPDATE_USER_BY_ID_FOR_CREATORS: DocumentNode = gql`
  mutation UpdateUserByIdForCreators(
    $userId: String!
    $role: String!
    $status: String!
  ) {
    updateUserByIdForCreators(
      updateUserByIdForCreatorsDto: {
        userId: $userId
        role: $role
        status: $status
      }
    ) {
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
