import React, { useState } from 'react';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';  // แก้ไขนี้เป็น next/router
import Loading from '@/app/loading';  // แก้ไขนี้เป็น app/loading (ตามไฟล์จริง)

const MyComponent = () => {  // แก้ไขนี้เป็น MyComponent (ตัวอักษรตัวพิมพ์ใหญ่ตัวแรก)

  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "authenticated") {
    router?.push("/user");
  }

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <InputShortener setInputValue={setInputValue} />
      <LinkResult inputValue={inputValue} />
    </>
  );
}

export default MyComponent;  // แก้ไขนี้เป็น MyComponent (ตัวอักษรตัวพิมพ์ใหญ่ตัวแรก)
