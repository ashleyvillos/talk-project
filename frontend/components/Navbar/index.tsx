import { useState } from 'react'
import { useColorMode, Switch, Flex, Button, IconButton, Box, Text, List, ListItem, Link } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { NAVIGATION_ROUTES } from '../../_nav'

// const Sidebar = () => {
//     interface Page {
//     name: string;
//     url: string;

//     }

//     const PAGES: Page[] = [
//         { name: "Home", url: "/" },
//         { name: "Users", url: "/users" },
//         { name: "Auth", url: "/auth" },
//         { name: "User List using toolkit", url: "/user-list" },
//         { name: "User List using rtk", url: "/user-list-rtk" },
//       ];

//     return (
//         <Box
//           w={"20vw"}
//           h={"full"}
//           bg={"indigo"}
//           color={"white"}
//           p={4}
//           position={"fixed"}
//           top={0}
//         >
//           <Text color={"orange"} fontSize={"3xl"} fontWeight={"extrabold"}>
//             NAVIGATION
//           </Text>
//           <List fontSize={"xl"}>
//             {PAGES.map((page) => (
//               <ListItem key={page.name} fontWeight={"semibold"}>
//                 <Link href={page.url}>{page.name}</Link>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//     )
// }

const Navbar = () => {
    const [display, changeDisplay] = useState('none')

    return (
        <Flex height="4em" borderBottom="1px solid #eaeced">
            <Flex alignItems="center" px={10} display={['none', 'none', 'flex', 'flex']}>
                <Box mr={3}>
                    <NextLink href="/" passHref>
                        Logo Here
                    </NextLink>
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
        </Flex>
    )
}

export default Navbar