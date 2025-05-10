import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react'; 

import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser}=useChatStore();


  useEffect(()=>{
    getMessages(selectedUser._id)
  },[getMessages,selectedUser._id])

   if(isMessagesLoading){
    return (
      <div className="flex-1 flex flex-col overflow-auto">
       <ChatHeader />
       <MessageSkeleton />
       <MessageInput />
      </div>);
   }
    

   

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <p>messages</p>
      <MessageInput />
    </div> 
  )
}

export default ChatContainer