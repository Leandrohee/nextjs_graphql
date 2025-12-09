import { HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

/* ------------------------------ USED WHEN SENDING JWT VIA HEADERS ----------------------------- */
// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_BACKEND_URL + 'graphql',
// });

// const authLink = new SetContextLink((headers) => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
/* ---------------------------------------------------------------------------------------------- */

/* ------------------------------ USED WHEN SENDING JWT VIA COOKIES ----------------------------- */
const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + 'graphql',
  credentials: 'include',
});

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
