import { Flex, Grid, Text, List, ListItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useFetchUsersByIdQuery } from "../../store/user-rtk/api";
import { Spinner } from '@chakra-ui/react'
import { useRouter } from "next/router";


const OneUser: NextPage = () => {
  const router = useRouter()
  const {data: oneUser, isFetching: isFetchingOneUser} = useFetchUsersByIdQuery(Number(router.query.id));
  return (
    <Grid gap={4}>
      <List>
        {isFetchingOneUser && <Spinner />} 
          {oneUser && (<ListItem>
              <Flex
                borderColor={"indigo"}
                borderWidth={2}
                borderRadius={"xl"}
                m={2}
                p={4}
                alignItems={"center"}
                gap={2}
              >
                <Text>
                  {oneUser.id}
                  {""}
                </Text>
                <Text>
                  {oneUser.name}
                  {""}
                </Text>
                <Text as={"small"} color={"orange"}>
                  @{oneUser.username}
                </Text>
              </Flex>
          </ListItem>)}
          </List>
    </Grid>
  )
};

export default OneUser;