'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loading from '@/app/loadding'

export default function RegisterForm() {
  
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();
  const params = useSearchParams();
  const [success, setSuccess] = useState("");
  console.log(params.get('error'));


  if (session.status === "loading") {
    return <Loading/>;
  }

  if (session.status === "authenticated") {
    router?.push("/user");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {

      const res = await fetch("../api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password

        }),
      });
      res.status === 200 && router.push("/login?success=Account has been created");

    } catch (err) {
      setError(true);
    }
  };
  return (
    <Flex
      minH={'94vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" name='firstname' />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" name='lastname' />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name='password' />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                type='submit'
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <div className=" text-red-600 text-sm flex justify-center my-2">
                {error && error}
              </div>
            </form>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href='/login'>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}