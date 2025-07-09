import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContianer from '../components/ChatContianer'
import RightSIdebar from '../components/RightSIdebar'
import { ChatContext } from '../context/ChatContext'

const HomePage = () => {
const {selectedUser}=useContext(ChatContext)

return (
    <div className='w-full h-screen px-2 py-2 sm:px-4 sm:py-4 lg:px-8 lg:py-6 xl:px-[10%] xl:py-[4%]'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid relative ${selectedUser ? 'grid-cols-1 lg:grid-cols-[280px_1fr_300px] xl:grid-cols-[320px_1fr_350px]' : 'grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]'}`}>
            <Sidebar />
            <ChatContianer />
            {selectedUser && <RightSIdebar />}
        </div>
    </div>
)
}

export default HomePage
