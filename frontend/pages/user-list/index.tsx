import { Button } from "@chakra-ui/button";
import { Flex, Grid, Text, List, ListItem, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserDetails } from "../../store/user/userAction";
import { selectUser } from "../../store/user/userSelector";

const User: NextPage = () => {
  const users = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserDetails());
  },[])

  return (
    <Grid gap={4}>
      <Flex>
        {/* <Button
          onClick={() => dispatch(getUserDetails())
          }
        >
          Get User
        </Button> */}
    </Flex>
    <Flex alignItems={"center"}>
    <List>
          {users.map((user) => (
            <ListItem key={user.id}>
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
                    {user.name}
                    {""}
                  </Text>
                  <Text as={"small"} color={"orange"}>
                    @{user.username}
                  </Text>
                </Flex>
            </ListItem>
          ))}
        </List>
    </Flex>
    </Grid>
  )
};

export default User;