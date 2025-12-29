"use client";
import { useFirebase } from '@/contexts/firebase'
import React, { useEffect } from 'react'

const Hero = () => {

    const { auth } = useFirebase();

    useEffect(() => {
        console.log(auth);
    },[])

  return (
    <div className='text-center text-4xl font-black'>Hero Page</div>
  )
}

export default Hero