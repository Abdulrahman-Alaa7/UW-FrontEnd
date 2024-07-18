import { gql, DocumentNode } from "@apollo/client";

export const UPDATE_USER_PROFILE_PIC: DocumentNode = gql`
  mutation updateUserProfilePic($image: Upload) {
    updateUserProfilePic(updateUserProfilePicDto: { image: $image }) {
      user {
        id
        name
        email
        password
        role
      }
    }
  }
`;
