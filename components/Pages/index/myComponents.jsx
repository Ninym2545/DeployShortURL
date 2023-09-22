"use client"
import React, { useState, useEffect } from 'react';
import InputShortener from './InputShortener ';
import LinkResult from './LinkResult ';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../../../app/loadding';

const MyComponent = () => {
  const session = useSession();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (session.status === "authenticated") {
      router?.push("/user");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <InputShortener setInputValue={setInputValue} />
      <LinkResult inputValue={inputValue} />
    </>
  );
};

export default MyComponent;
