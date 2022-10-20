import { Button } from "@chakra-ui/button";
import { Flex, Grid, Text, List, ListItem, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useFetchUsersQuery, useAddUserMutation } from "../../store/user-rtk/api";
import { Spinner } from '@chakra-ui/react'
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../store/user/userSlice";
import { useEffect } from "react";



const User: NextPage = () => {
  // const users = useSelector(rtkSelector);
  const {data = [], isFetching} = useFetchUsersQuery();
  // const [fetchUsers ,{data = [], isFetching}] = useLazyFetchUsersQuery();
  const [addUser, {isSuccess}] = useAddUserMutation();


  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  useEffect(() => {
    if(isSuccess) onClose();
  }, [isSuccess])

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    addUser(data);
  };

  return (
    <Grid gap={4}>
      <Flex>
        <Button bg={"orange"} fontSize={"2xl"} onClick={onOpen}>
          +
        </Button>
      </Flex>
      <Flex alignItems={"center"}>
      <List>
        {isFetching && <Spinner />}
        {data.map((user) => (  
          <ListItem key={user.id}>
          <Link href={{ pathname: '/user-list-rtk/oneUser', query: { id: user.id } }}>
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
              </Link>
          </ListItem> 
        ))}
      </List>
      </Flex>
      {/* MODAL FORM  */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>USER FORM</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Input
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <Input
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button bg={"orange"} type="submit">
              Submit
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
};

export default User;