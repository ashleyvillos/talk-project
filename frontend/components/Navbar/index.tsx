import { useState } from 'react'
import { useColorMode, Switch, Flex, Button, IconButton, Box, Text, List, ListItem, Link } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { NAVIGATION_ROUTES } from '../../_nav'
import { setCookie } from 'cookies-next'
import Image from 'next/image'
import Logo from '../../public/icons/logo.png'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    const [display, changeDisplay] = useState('none')
    const [isToggled, setIsToggled] = useState(true )

    return (
        <Flex height="4em" py={8} borderBottom="1px solid #eaeced" justifyContent="space-between">
            <Flex alignItems="center" px={10} display={['none', 'none', 'flex', 'flex']}>
                <Box mr={3} _hover={{cursor: 'pointer'}} onClick={() => router.push('/shops')}>
                    <Image
                        src={Logo}
                        alt="Picture of the author"
                        priority={true}
                        width="70px"
                        height="40px"
                    />
                </Box>

                {NAVIGATION_ROUTES.map((nav, index) => (
                    <Box key={`lg-nav-${index}`}>
                        <NextLink href={nav.route} passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label={nav.name}
                                w="100%"
                            >
                                { nav.name }
                            </Button>
                        </NextLink>
                    </Box>
                ))}
            </Flex>

            <IconButton 
                aria-label="Open Menu"
                size="lg"
                mr={2}
                icon={<HamburgerIcon />}
                display={['flex', 'flex', 'none', 'none']}
                onClick={() => changeDisplay('flex')}
                height="full"
            />

            <Flex
                w="100vw"
                bg="gray.50"
                zIndex={20}
                h="100vh"
                pos="fixed"
                top={0}
                left={0}
                overflowY="auto"
                flexDirection="column"
                display={display}
            >
                <Flex justifyContent="flex-end">
                    <IconButton 
                        mt={2}
                        mr={2}
                        aria-label="Close Menu"
                        size="lg"
                        icon={<CloseIcon />}
                        onClick={() => changeDisplay('none')}
                    />
                </Flex>
                <Flex flexDirection="column" align="center">
                    {NAVIGATION_ROUTES.map((nav, index) => (
                        <NextLink key={`sm-nav-${index}`} href={nav.route} passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label={nav.name}
                                w="100%"
                            >
                                { nav.name }
                            </Button>
                        </NextLink>
                    ))}
                </Flex>
            </Flex>

            <Flex justifyContent="center" alignItems="center" pr={5}>
                {/* <Text mr={5}> {(isToggled) ? '(Seller Mode)' : '(Buyer Mode)'} </Text> */}
                {/* <Switch 
                    isChecked={isToggled}  
                    onChange={() => setIsToggled((prevState: boolean) => !prevState)} 
                    mr={4}
                /> */}
                <NextLink href={'/logout'} passHref>
                    <Button
                        as="a"
                        variant="link"
                        aria-label="logout"
                    >
                        Logout
                    </Button>
                </NextLink>
            </Flex>
        </Flex>
    )
}

export default Navbar