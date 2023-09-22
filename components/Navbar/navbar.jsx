'use client'

import {
  Box,
  Flex,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Link,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { signOut, useSession } from 'next-auth/react'




const NavLink = () => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const session = useSession();
  const user = session.data?.user;
  const fullName = user ? `${user.firstname} ${user.lastname}` : 'Unknown User';
  console.log(session);


  return (
    <>
      <Box width={'full'} position={'fixed'} zIndex={'100'}>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box fontWeight={'600'} >
              <Link href='/' >
                <Text display={{ base: 'none', md: 'inline-flex' }}>ShortURL</Text>
              </Link>
            </Box>

            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>

                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                {session.status === "unauthenticated" && (


                  <Button as={'a'} fontSize={'md'} fontWeight={400} href='login'>
                    เข้าสู่ระบบ
                  </Button>



                )}
                {session.status === "authenticated" && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        size={'sm'}
                        name={fullName}
                      />
                    </MenuButton>
                    <MenuList>

                      <MenuItem onClick={signOut}>ออกจากระบบ</MenuItem>
                    </MenuList>
                  </Menu>
                )}


              </Stack>
            </Flex>
          </Flex>
        </Box>
      </Box>

    </>
  )
}