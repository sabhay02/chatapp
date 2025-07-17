import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContianer from '../components/ChatContianer'
import RightSIdebar from '../components/RightSIdebar'
import { ChatContext } from '../context/ChatContext'

const HomePage = () => {
const {selectedUser}=useContext(ChatContext)

return (
    <div className='w-full h-screen p-1 sm:p-2 md:p-4 lg:p-6 xl:px-[8%] xl:py-[3%]'>
        <div className={`backdrop-blur-xl border border-gray-600 sm:border-2 rounded-lg sm:rounded-2xl overflow-hidden h-full grid relative ${
            selectedUser 
                ? 'grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[320px_1fr_350px]' 
                : 'grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]'
        }`}>
            <Sidebar />
            <ChatContianer />
            {selectedUser && (
                <div className="hidden lg:block">
                    <RightSIdebar />
                </div>
            )}
        </div>
    </div>
)
}

export default HomePage
