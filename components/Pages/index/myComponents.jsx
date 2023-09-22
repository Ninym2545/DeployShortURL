"use client"
import React, { useState, useEffect } from 'react';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // Fixed import
import Loading from '@/app/loading'; // Fixed import

const MyComponents = () => {
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

export default MyComponents;
