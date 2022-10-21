import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { Layout } from "../components/Layout";
import Login from "./login";
import Signup from "./signup";


const queryClient = new QueryClient()

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const Content = () => {
    let pathname = appProps.router.pathname
    if (pathname === '/signup') {
      return <Signup />
    }  else if (pathname === '/login') {
      return <Login />
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )
    }
  }

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Content />
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp
