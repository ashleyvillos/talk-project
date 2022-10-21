import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";

const Logout: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        deleteCookie('accessToken')
        router.push('/login')
    }, [])
    return null
}

export default Logout