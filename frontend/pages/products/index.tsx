import type { NextPage } from "next";
import { 
   Select, 
   Box, 
   SimpleGrid, 
   Text, 
   Divider, 
   Button, 
   Flex, 
   VStack, 
   Modal, 
   ModalOverlay, 
   ModalHeader, 
   ModalContent, 
   ModalCloseButton, 
   ModalBody, 
   ModalFooter, 
   useDisclosure, 
   Input, 
   HStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../../hooks/useProduct";
import { getShops } from "../../hooks/useShops";
import { useQueryClient } from 'react-query';
import { useForm, SubmitHandler } from "react-hook-form";

const Products: NextPage = () => {
   const router = useRouter()
   const queryClient = useQueryClient()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [selectedIndex, setSelectedIndex] = useState(-1)

   const onSuccess = (data: any) => {}
   const onError = (data: any) => {
      if (data.response.status === 401) {
         deleteCookie('accessToken')
         router.push('/login')
      }
   }
   const onSettled = () => {
      queryClient.invalidateQueries('get-products')
   }
   const onModalSave: SubmitHandler<FormInput> = (formInput) => {
      if (selectedIndex > -1) {
         formInput.id = data?.data?.response[selectedIndex].id
         console.log(formInput)
         mutateUpdate(formInput)
      } else {
         console.log(formInput)
         mutateCreate(formInput)
      }
      onClose()
      reset()
   }
   interface FormInput {
      id?: number;
      shop_id: number;
      product_name: string;
      price: number;
   }
   const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormInput>({
		defaultValues: {
			product_name: '',
         price: 0
		}
	});
   const inputRules = {
      product_name: { required: true }
   }
   const { data } = getProducts(onSuccess, onError)
   const { data : shopData } = getShops(onSuccess, onError)
   const { mutate : mutateDelete } = deleteProduct(onSuccess, onError, onSettled)
   const { mutate : mutateCreate } = createProduct(onSuccess, onError, onSettled)
   const { mutate: mutateUpdate } = updateProduct(onSuccess, onError, onSettled)

   const ShopDropdown = () => {
      let SD = shopData?.data.response 
      let isUpdate = (selectedIndex > -1)

      return (
         <Select disabled={isUpdate} {...register('shop_id')}>
            {SD.map((shop: any, index: number) => (
               <option 
                  key={`shop-${index}`} 
                  value={shop.id}
               > 
                  { shop.name } 
               </option>
            ))}
         </Select>
      )
   }

   const ProductModal = () => {
      let productData = data?.data.response[selectedIndex]  || ''
      let setValues = (selectedIndex > -1)
      return (
         <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onClose={onClose}>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>{ (setValues) ? productData.name : '' }</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <form id="modal-form" onSubmit={handleSubmit(onModalSave)}>
                        <VStack w="full" spacing={18}>
                           <Box w="full">
                              <Text> Name: </Text>
                              <Input 
                                 {...register('product_name', inputRules.product_name)}
                                 type="text"
                                 placeholder="Name"
                                 // defaultValue={ productData?.product_name || 'qwe' }
                              />
                              {errors?.product_name?.type == 'required' && <Text color="red.300"> Product name is required </Text>}
                           </Box>
                           <Box w="full">
                              <Text> Shop: </Text>
                              <ShopDropdown />
                           </Box>
                           <Box w="full">
                              <Text> Price: </Text>
                              <Input 
                                 {...register('price', { valueAsNumber: true })}
                                 type="text"
                                 placeholder="Price"
                                 // defaultValue={ (setValues) ? productData.price : 0 }
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
         <ProductModal />
         <Flex px={10} mt={5}>
            <Button 
               variant="ghost" 
               bg="#0aa1e2" 
               _hover={{ bg: "#2C6DA7", color: "white" }}
               onClick={() => {
                  setSelectedIndex(-1)
                  reset()
                  onOpen()
               }}
            >
               Add Product      
            </Button>
         </Flex>
         <SimpleGrid columns={[1, 1, 3, 5]} spacingX={10} spacingY={10} height="100%" py={10} px={10}>
            {data?.data.response.map((product: any, index: number) => (
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
                     { product.product_name }    
                  </Text>
                  
                  <SimpleGrid py={[0, 0, 20]} columns={[1, 1, 2]} spacingY={5} spacingX={1}>
                     <Button  bg="green.300"> View </Button>
                     <Button 
                        // minWidth="50%" 
                        bg="orange.300" 
                        onClick={() => {
                           setSelectedIndex(index)
                           setValue('product_name', product.product_name)
                           setValue('shop_id', product.shop_id)
                           setValue('price', product.price)
                           onOpen()
                        }}
                     > 
                        Edit 
                     </Button>
                     <Button minWidth="50%" bg="red.300" onClick={() => mutateDelete(product.id)}> Delete </Button>
                     <Button minWidth="50%" bg="yellow.300"> Add to Cart </Button>
                  </SimpleGrid>
                  {/* <VStack spacing={6}>
                     <HStack w="full">
                        <Button minWidth="50%" bg="green.300"> View </Button>
                        <Button 
                           minWidth="50%" 
                           bg="orange.300" 
                           onClick={() => {
                              setSelectedIndex(index)
                              onOpen()
                           }}
                        > 
                           Edit 
                        </Button>
                     </HStack>
                     <HStack w="full">
                        <Button minWidth="50%" bg="red.300" onClick={() => mutateDelete(product.id)}> Delete </Button>
                        <Button minWidth="50%" bg="yellow.300" onClick={() => mutateDelete(product.id)}> Add to Cart </Button>
                     </HStack>
                  </VStack> */}
               </Box>   
            ))}
         </SimpleGrid>
      </>
   )
}

export default Products