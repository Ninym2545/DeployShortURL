"use client"
import Nav from "@/components/Navbar/navbar";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { Noto_Sans_Thai } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loadding";

const inter = Noto_Sans_Thai({ subsets: ["latin"] , weight: ["500"] });



export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to demonstrate the loading page
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the duration as needed

    // Clear the timeout if the component is unmounted before the timeout completes
    return () => clearTimeout(timeout);
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <AuthProvider>
          {loading ? (
        <Loading />
      ) : (
        <>
        <Nav />
        {children}
        </>
      )}
        
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
