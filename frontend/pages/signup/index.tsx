import { 
    Box,
    Flex,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Divider,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from 'next/image'
import Logo from '../../public/icons/logo.png'
import { LockIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useSignup } from "../../hooks/useSignup";
import swal from "prettyalert";

const Signup: NextPage = () => {
	const router = useRouter()
    interface FormInput {
        username: string;
        password: string;
		confirmPassword: string
    }
    const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm<FormInput>({
		defaultValues: {
			username: '',
			password: '',
			confirmPassword: ''
		}
	});
    const [colors, setColors] = useState({
        username: '#cbd5e0',
        password: 'gray.300',
		confirmPassword: 'gray.300'
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
	const onError = (data: any) => {
		swal({
			title: 'Oops!',
			text: 'There was an error',
			icon: 'error'
		})
	}
	const onSuccess = (data: any) => {
		if (data.status == 200) {
			swal({
				text: 'Sign Up Completed',
				icon: 'success'
			}).then(() => {
				router.push('/login')
			})
		} else {
			swal({
				title: 'Oops!',
				text: data.message,
				icon: 'error'
			})
		}
	}
	
	const onSignUp: SubmitHandler<FormInput> = (formInput) => { mutate(formInput) }
	const { mutate } = useSignup(onSuccess, onError)

	useEffect(() => {
		const subscription = watch((data) => {
			if (data.password !== data.confirmPassword) {
				setError('confirmPassword', {type: 'passwordMatch', message: "Passwords don't match"})
			} else {
				clearErrors(['confirmPassword'])
			}
		})
		return () => {
			subscription.unsubscribe()
		}
	}, [watch])

    const ErrorMessage = ({field, errorType}: {field: string, errorType: string}) => {
        if (field === 'username') {
            if (errorType === 'required') {
                return <Text color="red.300"> Username is required </Text>
            } else if (errorType === 'maxLength') {
                return <Text color="red.300"> Username should have {inputRules.username.maxLength} or less characters </Text>
            }
        } else if (field === 'password' || field === 'confirmPassword') {
            if (errorType === 'required') {
                return <Text color="red.300"> Password is required </Text>
            } else if (errorType === 'minLength') {
                return <Text color="red.300"> Password should have {inputRules.password.minLength} or more characters </Text>
            } else if (errorType === 'pattern') {
                return <Text color="red.300"> Password should contain at least one letter and one number </Text>
            } else if (errorType === "passwordMatch") {
				return <Text color="red.300"> Passwords don't match </Text>
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
					<Box width="full">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                h="full"
                                children={<LockIcon color={colors.confirmPassword} />}
                            />
                            <Input 
                                {...register('confirmPassword', inputRules.password)}
                                onFocus={() => setColors((prevState) => ({ ...prevState, confirmPassword: '#0aa1e2' }))} 
                                onBlur={() => setColors((prevState) => ({ ...prevState, confirmPassword: 'gray.300' }))} 
                                type='password' 
                                placeholder='Confirm Password'
                                size="lg" 
                            />
                        </InputGroup>
                        <ErrorMessage field="confirmPassword" errorType={errors?.confirmPassword?.type || ''} />
                    </Box>
                    <Button 
                        size="lg" 
                        width={['100%']} 
                        bg="white" 
                        border="1px solid #0aa1e2"
                        color="#0aa1e2"
                        _hover={{bg: "white", border: "2px solid #0aa1e2"}}
                        borderRadius="2em"
						onClick={handleSubmit((data) => {
							onSignUp(data)
						})}
                    >
                        Sign Up
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    )
};

export default Signup;
    