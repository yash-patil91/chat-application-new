import React, { useState } from 'react';
import './App.css'
import ChatApp from './ChatApp';

function App() {
  const [user1] = useState('User1');
  const [user2] = useState('User2');

  return (
    <div>
      <h2>Chat Application for Two Users</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>{user1}'s Chat</h3>
          <ChatApp currentUser={user1} chatWith={user2} />
        </div>
        <div>
          <h3>{user2}'s Chat</h3>
          <ChatApp currentUser={user2} chatWith={user1} />
        </div>
      </div>
    </div>
  );
}

export default App;
