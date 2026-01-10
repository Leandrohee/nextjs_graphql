import { gql } from '@apollo/client';

export const SIGNIN_QUERY = gql`
  query SignIn_Query($email: String!, $password: String!) {
    signIn(loginInput: { email: $email, password: $password }) {
      message
    }
  }
`;

export const SIGNOUT_QUERY = gql`
  query SignOut_Query {
    signOut {
      success
      message
    }
  }
`;
