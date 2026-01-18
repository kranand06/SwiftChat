import React, { useState } from 'react'
import ChatContainer from './ChatContainer'
import Profilebar from './Profilebar'
import Sidebar from './Sidebar'

const ChatPage = () => {

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className=' h-screen overflow-hidden bg-theme text-theme-1 transition-colors duration-300 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12'>
            <div
                className={`backdrop-blur-xl border-2 border-gray-500 rounded-2xl w-full
    h-[80vh] shadow-lg overflow-hidden
    grid grid-cols-1
    ${selectedUser
                        ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
                        : "md:grid-cols-[1fr_2fr]"}
  `}
            >
                <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <Profilebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
        </div>
    )
}

export default ChatPage