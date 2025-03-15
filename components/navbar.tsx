import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from './theme-toggle'

const Navbar = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-4'>
        <div className='flex items-center overflow-y-auto'>
          <StoreSwitcher items={stores} />
          <MainNav className='mx-6' />
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSwitchSessionUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
