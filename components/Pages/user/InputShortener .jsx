"use client";

import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  StackDivider,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { MdQrCode } from 'react-icons/md'
import { Input } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { Spinner } from '@chakra-ui/react'
import QRCode from "react-qr-code";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'




export default function InputShortener() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [shortenLink, setShortenLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const session = useSession();

  // ส่วน pagination 
  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const url = value
    const user = session.data.user._id
    try {
      setIsLoading(true);
      const res = await fetch("../api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          user
        })
      })
      const content = await res.json()
      console.log("content ---> ", content);
      if (content) {
        //add new url above all previous urls
        console.log(content);
        setData([content, ...data]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/url/${session.data?.user._id}`).then(res => res.json()).then(data => {
      setData(data)
      setIsLoading(false)
    })
  }, []);

  if (isLoading) {

    return <>
      <div className="w-full h-[94vh] flex justify-center">
        <div className="flex flex-col  items-center my-auto">
          <Spinner color='red.500' />
        </div>
      </div>
    </>
  }

  return (
    <>
      <Container maxW={"7xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pt={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            URL <span className="text-cyan-600">Shorten</span> <br />

            <form onSubmit={handleOnSubmit}>
              <Box display={'flex'} mt={{ base: '4' }} px={{ base: "2", sm: "7" }}>
                <Input variant='filled' type="text" name="urls" placeholder='Enter full url...' mx={{ base: '3' }} fontSize={{ base: "14px", sm: "16px" }} value={value} onChange={e => setValue(e.target.value)} />
                <Button colorScheme='blue' width={{ base: "200px" }} type="submit" fontSize={{ base: "14px", sm: "16px" }} >Create Short URL</Button>
              </Box>
            </form>
          </Heading>
        </Stack>
      </Container>

      {data?.length > 0 && (
        <Container maxW={{base: "5xl" , md: "6xl"}} my={{ base: '5' }}>
          <Card >
            <CardHeader >
              <Heading size='md'>History</Heading>
            </CardHeader>
            {
              records?.map((sg, i) => (
                <Box display={'flex'} flexDirection={'row'} borderBottom={'2px'} borderBottomColor={'gray.200'} key={i} >
                  <CardBody width={{ base: '100px' , sm: '300px' , md: "400px" }}>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          Full URL 
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          {sg.fullurl}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          Short URL
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          <a href={`/${encodeURIComponent(sg.shorturl)}`} target="_blank">
                            {window.location.origin + "/" + sg.shorturl}
                          </a>
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          Clicked
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          {sg.clicked}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          QR Code
                        </Heading>
                        <Text pt='2' fontSize='sm' p={{ base: '5' , sm: '8'}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                          <Box width={{ base: "100px" , sm: "180px" , md: "200px" }} >
                            <QRCode
                              size={{ base: '200px' }}
                              value={sg.shorturl}
                              viewBox={`0 0 256 256`}
                            />
                          </Box>

                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Box>
              ))
            }
          </Card>

          <nav>
            <ul className="flex justify-end mx-1 my-5">
              <li className="page-item mx-1 border-2 rounded-l-xl px-2 py-1">
                <a className="page-link" onClick={prePage} >
                  ก่อนหน้า
                </a>
              </li>
              {
                number.map((n, i) => (
                  <li className={`page-item mx-1 px-3 text-center items-center rounded-md ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a className="page-link flex justify-items-center mt-1"
                      onClick={() => changeCPage(n)}>{n}</a>
                  </li>
                ))
              }
              <li className="page-item mx-1 border-2 rounded-r-xl px-2 py-1">
                <a className="page-link" onClick={nextPage} >
                  ถัดไป
                </a>
              </li>
            </ul>
          </nav>
        </Container>

      )}



    </>
  )

  function nextPage() {
    if (currentPage !== npage) {
      setcurrentPage(currentPage + 1)
    }
  }
  function prePage() {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setcurrentPage(id)
  }

}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
