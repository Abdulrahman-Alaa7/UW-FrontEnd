"use client";

import { gql, DocumentNode } from "@apollo/client";

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $name: String!
    $password: String!
    $email: String!
    $gender: String!
    $role: String!
    $status: String!
  ) {
    register(
      registerDto: {
        name: $name
        email: $email
        password: $password
        role: $role
        gender: $gender
        status: $status
      }
    ) {
      activation_token
    }
  }
`;
