import type { NextPage } from "next";
import { Box, SimpleGrid, Text, Divider, Button, Flex, VStack, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { createShop, deleteShop, getShops, updateShop } from "../../hooks/useShops";
import { useQueryClient } from 'react-query';
import { useForm, SubmitHandler } from "react-hook-form";

const Shops: NextPage = () => {
   const router = useRouter()
   const queryClient = useQueryClient()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [selectedIndex, setSelectedIndex] = useState(-1)

   const onSuccess = (data: any) => {}
   const onError = (data: any) => {
      console.log(data, 'qwe')
      if (data.response.status === 401) {
         deleteCookie('accessToken')
         router.push('/login')
      }
   }
   const onSettled = () => {
      queryClient.invalidateQueries('get-shops')
   }
   const onModalSave: SubmitHandler<FormInput> = (formInput) => {
      if (selectedIndex > -1) {
         formInput.id = data?.data?.response[selectedIndex].id
         mutateUpdate(formInput)
      } else {
         console.log('creating')
         mutateCreate(formInput)
      }
      onClose()
      reset()
   }
   interface FormInput {
      id?: number;
      name: string;
      address: string;
      business_type: string;
   }
   const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormInput>({
		defaultValues: {
			name: '',
			address: '',
         business_type: ''
		}
	});
   const inputRules = {
      name: { required: true }
   }
   const { data } = getShops(onSuccess, onError)
   const { mutate : mutateDelete } = deleteShop(onSuccess, onError, onSettled)
   const { mutate : mutateCreate } = createShop(onSuccess, onError, onSettled)
   const { mutate: mutateUpdate } = updateShop(onSuccess, onError, onSettled)

   const ShopModal = () => {
      let shopData = data?.data.response[selectedIndex]  || ''
      let setValues = (selectedIndex > -1)
      return (
         <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onClose={onClose}>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>{ (setValues) ? shopData.name : '' }</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <form id="modal-form" onSubmit={handleSubmit(onModalSave)}>
                        <VStack w="full" spacing={18}>
                           <Box w="full">
                              <Text> Name: </Text>
                              <Input 
                                 {...register('name', inputRules.name)}
                                 type="text"
                                 placeholder="Name"
                                 defaultValue={ shopData?.name || 'qwe' }
                                 
                              />
                              {errors?.name?.type == 'required' && <Text color="red.300"> Shop name is required </Text>}
                           </Box>
                           <Box w="full">
                              <Text> Address: </Text>
                              <Input 
                                 {...register('address')}
                                 type="text"
                                 placeholder="Address"
                                 defaultValue={ (setValues) ? shopData.address : '' }
                              />
                           </Box>
                           <Box w="full">
                              <Text> Business Type: </Text>
                              <Input 
                                 {...register('business_type')}
                                 type="text"
                                 placeholder="Business Type"
                                 defaultValue={ (setValues) ? shopData.business_type : '' }
                              />
                           </Box>
                        </VStack>
                     </form>
                  </ModalBody>

                  <ModalFooter>
                     <Button 
                        form="modal-form"
                        type="submit"
                        colorScheme='blue' 
                        variant="solid" 
                        mr={3} 
                     >
                        Save
                     </Button>
                     
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      )
   }

   return (
      <>
         <ShopModal />
         <Flex px={10} mt={5}>
            <Button 
               variant="ghost" 
               bg="#0aa1e2" 
               _hover={{ bg: "#2C6DA7", color: "white" }}
               onClick={() => {
                  setSelectedIndex(-1)
                  onOpen()
               }}
            >
               Add Shop      
            </Button>
         </Flex>
         <SimpleGrid columns={[1, 1, 3, 5]} spacingX={10} spacingY={10} height="100%" py={10} px={10}>
            {data?.data.response.map((shop: any, index: number) => (
               <Box 
                  key={`shop-card-${index}`}
                  border="1px solid black"
                  borderRadius="0.2em"
                  height='315px' 
                  maxWidth="275px"
                  pt={3}
                  px={3}
               > 
                  <Text fontSize="xl" as="b">
                     { shop.name }    
                  </Text>
                  <Divider my={5} />
                  <VStack spacing={6}>
                     <Button minWidth="50%" bg="green.300"> View </Button>
                     <Button 
                        minWidth="50%" 
                        bg="orange.300" 
                        onClick={() => {
                           setSelectedIndex(index)
                           setValue('name', shop.name)
                           setValue('address', shop.address)
                           setValue('business_type', shop.business_type)
                           onOpen()
                        }}
                     > 
                        Edit 
                     </Button>
                     <Button minWidth="50%" bg="red.300" onClick={() => mutateDelete(shop.id)}> Delete </Button>
                  </VStack>
               </Box>   
            ))}
         </SimpleGrid>
      </>
   )
}

export default Shops