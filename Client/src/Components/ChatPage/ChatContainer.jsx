import { ImagePlus, SendHorizontal } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { messagesDummyData } from '../assets'
import { messageTime, scrollToBottom } from '../util';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {

  const currentUserId = "680f5116f10f3cd28382ed02"; // Example current user ID

  const scrollEnd = useRef(null);

  useEffect(() => {
    scrollToBottom(scrollEnd);
  }, []);

  return selectedUser ? (
  <div className="h-full flex flex-col overflow-hidden border-r-2 border-gray-500">
      {/* Header (fixed) */}
      <div className="border-b-2 border-gray-500 p-4 flex items-center gap-4">
        <img
          src={selectedUser.profilePic || "/avatar_icon"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-theme-1 font-medium">
          {selectedUser.fullName}
        </h2>
      </div>

      {/* Messages (scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messagesDummyData.map((message) => {
    const isSender = message.senderId === currentUserId; 

    return (
      <div
        key={message._id}
        className={`flex ${isSender ? "justify-end" : "justify-start"}`}
      >
        {/* Receiver avatar (LEFT only) */}
        {!isSender && (
          <img
            src={selectedUser.profilePic || "/avatar_icon"}
            alt={selectedUser.fullName}
            className="w-8 h-8 rounded-full object-cover mr-2 self-end"
          />
        )}

        <div className="max-w-xs md:max-w-md lg:max-w-lg">
          {/* Message bubble */}
          {message.image ? (
            <img
              src={message.image}
              alt="sent"
              className={`rounded-lg ${
                isSender ? "bg-primary" : "bg-custom-grey"
              }`}
            />
          ) : (
            <div
              className={`px-4 py-2 rounded-lg
                ${
                  isSender
                    ? "bg-primary text-white"
                    : "bg-custom-grey text-theme-1"
                }
              `}
            >
              {message.text}
            </div>
          )}

          {/* Time */}
          <span
            className={`block text-xs text-theme-2 mt-1 ${
              isSender ? "text-right" : "text-left"
            }`}
          >
            {messageTime(message.createdAt)}
          </span>
        </div>
      </div>
    );
  })}
</div>

      {/* Input (fixed) */}
      <div className="border-t-2 border-gray-500 p-4">
        <div className="flex items-center gap-4">
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image" className="cursor-pointer">
            <ImagePlus />
          </label>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-theme-1 placeholder:text-theme-2"
          />
          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-hover transition">
            <SendHorizontal />
          </button>
        </div>
      </div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className="flex flex-row items-center gap-4">
        <img className="w-12" src="favicon.svg" alt="logo" />
        <h1 className="text-4xl font-semibold">SwiftChat</h1>
      </div>
      <h1 className="text-accent mt-4 text-2xl font-semibold">Chat anytime, anywhere</h1>
    </div>
  )
}

export default ChatContainer