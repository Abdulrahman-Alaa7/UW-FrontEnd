import { gql, DocumentNode } from "@apollo/client";

export const UPDATE_PROFILE_USER: DocumentNode = gql`
  mutation updateProfile(
    $name: String!
    $bio: String
    $gender: String
    $phone_number: Float
    $address: String
    $dob: DateTime
  ) {
    updateProfile(
      updateProfileUserDto: {
        name: $name
        bio: $bio
        gender: $gender
        phone_number: $phone_number
        address: $address
        dob: $dob
      }
    ) {
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
