import { gql } from '@apollo/client';

export const CREATEUSER_MUTATION = gql`
  mutation createUser_Mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String
  ) {
    createUser(
      createUserInput: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      cod_user
      email
      firstName
      lastName
      created_at
    }
  }
`;
