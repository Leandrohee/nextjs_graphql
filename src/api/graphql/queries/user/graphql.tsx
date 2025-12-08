import { gql } from '@apollo/client';

export const SIGNIN_QUERY = gql`
  query SignIn_Query($email: String!, $password: String!) {
    signIn(loginInput: { email: $email, password: $password }) {
      message
    }
  }
`;
