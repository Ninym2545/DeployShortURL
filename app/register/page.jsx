import React from 'react'
import dynamic from 'next/dynamic';

const MyClientComponent = dynamic(() => import('../../components/Pages/register/MyComponents'), {
  ssr: false, // Treat this component as a "Client Component" ss
});
export const metadata = {
  title: 'Register',
}
const page = () => {
  return (

    <MyClientComponent />
  )
}

export default page