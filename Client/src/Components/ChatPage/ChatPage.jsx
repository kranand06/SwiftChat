import React from 'react'
import ChatContainer from './ChatContainer'
import Profilebar from './Profilebar'
import Sidebar from './Sidebar'

const ChatPage = () => {

    const [selectedChat, setSelectedChat] = React.useState("okay");

    return (
        <div className='min-h-screen bg-theme text-theme-1 transition-colors duration-300 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
            <div className={`backdrop-blur-xl border-2 border-gray-500 rounded-2xl w-full h-[80vh] shadow-lg
                grid grid-cols-1 ${ selectedChat ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'} ` } >
                <Sidebar />
                <ChatContainer />
                <Profilebar />
            </div>
        </div>
    )
}

export default ChatPage