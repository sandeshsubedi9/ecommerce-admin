import React from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Navbar from '@/components/navbar'

 async function DashboardLayout ({children, params}: {children: React.ReactNode, params: Promise<{storeId: string}>})  {
    const {userId } =  await auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const { storeId } = await params

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })

    if(!store) {
        redirect('/')
    }

  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default DashboardLayout

