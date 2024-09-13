import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
// import './ChatApp.css'; // We'll add styles here

const socket = io('http://localhost:5000');

function ChatApp({ currentUser, chatWith }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${currentUser}/${chatWith}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on(`message:${currentUser}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off(`message:${currentUser}`);
  }, [currentUser, chatWith]);

  const sendMessage = async () => {
    if (input.trim()) {
      try {
        const messageData = { content: input, sender: currentUser, receiver: chatWith };
        await axios.post('http://localhost:5000/api/message', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="chat-container">
      <h1>Chat between {currentUser} and {chatWith}</h1>
      <div className="message-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-item ${message.sender === currentUser ? 'sent' : 'received'}`}
          >
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message"
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default ChatApp;
