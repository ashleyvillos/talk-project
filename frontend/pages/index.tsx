import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/shops')
}, [])
  return null;
};

export default Home;
