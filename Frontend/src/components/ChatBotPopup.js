// src/components/ChatBotPopup.js
import React, { useState } from 'react';
import './ChatBotPopup.css'; // Make sure this file is in the same directory as the component

const ChatBotPopup = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      {/* Button to toggle the chatbot */}
      <button className="chatbot-btn" onClick={toggleChat}>
        Chat with Us
      </button>

      {/* Chat Popup */}
      {showChat && (
        <div className="chat-popup">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/Q-OBmUs33mZR6o4waYgCU"
            width="400"
            height="600"
            style={{ border: 'none' }}
            title="ChatBot"
          />
          <button className="close-btn" onClick={toggleChat}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBotPopup;
