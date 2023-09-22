import React from 'react'
import dynamic from 'next/dynamic';

const MyClientComponent = dynamic(() => import('../components/Pages/index/myComponents'), {
  ssr: false, // Treat this component as a "Client Component"
});

export const metadata = {
  title: 'Short URL',
}
const page = () => {

  return (
    <MyClientComponent/>
  )
}

export default page