import { 
    Box,
    Flex,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Divider,
    HStack,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from 'next/image'
import Logo from '../../public/icons/logo.png'
import { LockIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import { useEffect, useState, memo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";


const Login: NextPage = () => {
    interface FormInput {
        username: string;
        password: string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const onLogin: SubmitHandler<FormInput> = (data) => {
        console.log('login')
        console.log(data)
    }

    const onSignup: SubmitHandler<FormInput> = (data) => {
        console.log('signup')
        console.log(data)
    }

    const [colors, setColors] = useState({
        username: '#cbd5e0',
        password: 'gray.300'
    })

    const inputRules = {
        username: {
            required: true,
            maxLength: 20,
        },
        password: {
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi,
            minLength: 8,
        }
    }

    const ErrorMessage = ({field, errorType}: {field: string, errorType: string}) => {
        if (field === 'username') {
            if (errorType === 'required') {
                return <Text color="red.300"> Username is required </Text>
            } else if (errorType === 'maxLength') {
                return <Text color="red.300"> Username should have {inputRules.username.maxLength} or less characters </Text>
            }
        } else if (field === 'password') {
            if (errorType === 'required') {
                return <Text color="red.300"> Password is required </Text>
            } else if (errorType === 'minLength') {
                return <Text color="red.300"> Password should have {inputRules.password.minLength} or more characters </Text>
            } else if (errorType === 'pattern') {
                return <Text color="red.300"> Password should contain at least one letter and one number </Text>
            }
        }

        return null
    }

    return (
        <Flex height="100%" width="100%" minWidth="430px" minHeight="510px" justifyContent="center" alignItems="center">
            <Flex
                border="1px solid #eaeced"
                borderRadius="md" 
                height={{
                    base: '100%', 
                    sm: '100%',
                    md: '600px'
                }}
                width={{
                    base: '100%',
                    sm: '100%',
                    md: '550px'
                }}
                flexDirection="column"
                justifyContent="center"
            >   
                <Flex width="100%" justifyContent="center" >
                    <Image
                        src={Logo}
                        alt="Picture of the author"
                        priority={true}
                        width="100px"
                        height="70px"
                    />
                </Flex>
                
                <VStack px={14} spacing={8} mt={50}>
                    <Box width="full">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                h="full"
                                children={<FaUser color={colors.username} />}
                            />
                            <Input 
                                {...register('username', inputRules.username)}
                                onFocus={() => setColors((prevState) => ({ ...prevState, username: '#0aa1e2' }))} 
                                onBlur={() => setColors((prevState) => ({ ...prevState, username: '#cbd5e0' }))} 
                                type='text' 
                                placeholder='Username' 
                                size="lg" 
                            />
                        </InputGroup>
                        <ErrorMessage field="username" errorType={errors?.username?.type || ''} />
                    </Box>
                    <Box width="full">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                h="full"
                                children={<LockIcon color={colors.password} />}
                            />
                            <Input 
                                {...register('password', inputRules.password)}
                                onFocus={() => setColors((prevState) => ({ ...prevState, password: '#0aa1e2' }))} 
                                onBlur={() => setColors((prevState) => ({ ...prevState, password: 'gray.300' }))} 
                                type='password' 
                                placeholder='Password'
                                size="lg" 
                            />
                        </InputGroup>
                        <ErrorMessage field="password" errorType={errors?.password?.type || ''} />
                    </Box>
                    <Button 
                        size="lg" 
                        width={['100%']} 
                        bg="#0aa1e2" 
                        _hover={{bg: "#2C6DA7", color: 'white'}}
                        borderRadius="2em"
                        color="white"
                        onClick={handleSubmit((data) => {
                            onLogin(data)
                        })}
                    >
                        Sign In
                    </Button>
                    <Divider />
                    <Button 
                        size="lg" 
                        width={['100%']} 
                        bg="white" 
                        border="1px solid #0aa1e2"
                        color="#0aa1e2"
                        _hover={{bg: "white", border: "2px solid #0aa1e2"}}
                        borderRadius="2em"
                        onClick={handleSubmit((data) => {
                            onSignup(data)
                        })}
                    >
                        Sign Up
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    )
};

export default Login;
