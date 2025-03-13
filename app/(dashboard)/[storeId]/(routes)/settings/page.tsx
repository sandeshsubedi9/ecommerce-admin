import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import { SettingsForm } from './components/settings-form'

interface SettingsPageProps {
    params: Promise<{ storeId: string }>
}

const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {
    const {storeId} = await params
    const {userId} = await auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const strore = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })

    if(!strore) {
        redirect('/')
    }
    
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm initialData={strore}/>
        </div>
    </div>
  )
}

export default SettingsPage
