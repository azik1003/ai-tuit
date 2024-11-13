"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path = usePathname();
    useEffect(() =>{
        console.log(path)
    })

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <div className='flex gap-4'>
        <Image src={'/logo.svg'}  width={40} height={20} alt='logo'/>
        <p className='mt-2'>AI interview</p>
        </div>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard' && 'text-primary font-bold'}
                `}>
                Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard' && 'text-primary font-bold'}
                `}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard' && 'text-primary font-bold'}
                `}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard' && 'text-primary font-bold'}
                `}>How It works?</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header
