import React from 'react'
import UserMsg from './UserMsg'
import OtherMsg from './OtherMsg'

function Chat({ messages, currentUser, handleScroll}) {
  return (
    <div className="h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide"
      onScroll={handleScroll}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => {
          if (message.sender.toString() === currentUser._id.toString()) {
            return <UserMsg key={index} message={message} />;
          } else {
            return <OtherMsg key={index} message={message} />;
          }
        })
      ) : (
        <p>Loading messages...</p>
      )}
    </div>
  );
} 

export default Chat
