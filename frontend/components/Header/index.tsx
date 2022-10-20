import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/auth/authSelector";

export const Header: React.FC<any> = () => {
  const authState = useSelector(selectAuthState);
  
  return (
      <Flex 
        w={"full"}
        justifyContent={"flex-end"} 
        h={"5rem"}
        bg={"gray"}
        color={"white"}
        p={4}
        >
          <Text fontSize={"3xl"} fontWeight={"extrabold"} color={"white"}>
          {authState ? "Logged in" : "Not Logged In"}
          </Text>
      </Flex>
  );
};
