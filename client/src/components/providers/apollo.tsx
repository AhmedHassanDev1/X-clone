"use client"
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import get_cookies from "@/utils/cookies";
import { createFragmentRegistry } from "@apollo/client/cache";
import GlobalFragment from "@/graphql/fragments";

let httplink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,

})

let authContenxt = setContext(async (_, { headers }) => {
  let token
  if (!token) {
    token = await get_cookies('access_token')
  }


  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.value}` : ""

    }
  }
})

export let cache = new InMemoryCache({
  fragments: createFragmentRegistry(GlobalFragment),
  typePolicies: {
    TweetEntity: {
      fields: {
        createdAt: {
          read(date) {
              if (date) return new Date(Number(date))
              return date   
              
          }
        }
      }
    }
  }
})

export let client = new ApolloClient({
  link: authContenxt.concat(httplink),
  cache,

})
function apolloProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export default apolloProvider