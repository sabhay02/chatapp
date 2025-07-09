import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContianer from '../components/ChatContianer'
import RightSIdebar from '../components/RightSIdebar'
import { ChatContext } from '../context/ChatContext'

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen px-3 py-3 sm:px-6 sm:py-6 lg:px-12 lg:py-8 xl:px-[8%] xl:py-[3%] page-transition'>
      <div className={`
        dark-glass rounded-3xl overflow-hidden h-full grid relative
        shadow-2xl border border-white/10 card-premium
        ${selectedUser 
          ? 'grid-cols-1 lg:grid-cols-[320px_1fr_340px] xl:grid-cols-[360px_1fr_380px]' 
          : 'grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr]'
        }
      `}>
        <Sidebar />
        <ChatContianer />
        {selectedUser && <RightSIdebar />}
      </div>
    </div>
  )
}

export default HomePage;