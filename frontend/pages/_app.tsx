import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { wrapper } from "../store/store";
import Login from "./login";
import Signup from "./signup";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  // console.log(Component)
  // console.log(pageProps)
  
  const Content = () => {
    let pathname = appProps.router.pathname
    if (pathname === '/signup') {
      return <Signup />
    } 
    
    else if (pathname === '/login') {
      return <Login />
    } 
    
    else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )
    }
  }

  return (
    <ChakraProvider>
      <Content />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
