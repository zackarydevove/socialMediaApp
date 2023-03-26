import React from 'react'
import UserMsg from './UserMsg'
import OtherMsg from './OtherMsg'

function Chat({ messages, currentUser}) {
  return (
    <div className="h-full flex flex-col-reverse  overflow-y-scroll">
      {messages && messages.length > 0 ? (
        messages.map((message) => {
          if (message.sender.toString() === currentUser._id.toString()) {
            return <UserMsg key={message._id} message={message} />;
          } else {
            return <OtherMsg key={message._id} message={message} />;
          }
        })
      ) : (
        <p>Loading messages...</p>
      )}
    </div>
  );
}

export default Chat
