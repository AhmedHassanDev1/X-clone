"use client"
import ApolloProvider from "@/components/providers/apollo";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from "react-redux";
import Store from "@/store/store";
import "./globals.css";

let client = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" className=''>
      <body
        className=''
      >
        <main className="w-full min-h-screen  bg-black text-white">
          <Provider store={Store}>
            <ApolloProvider>
              <QueryClientProvider client={client}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
              </QueryClientProvider>
            </ApolloProvider>
          </Provider>
        </main>
      </body>
    </html>
  );
}
