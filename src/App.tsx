// frontend/src/App.tsx

import React from 'react';
import BotStatus from './components/BotStatus';
import ChatLog from './components/ChatLog';
import ManualChatForm from './components/ManualChatForm'; // フォームをインポート

function App() {
  return (
    <div className="App">
      <h1>YouTube Live Bot 管理画面</h1>
      <hr />
      <BotStatus />
      <hr />
      <ManualChatForm /> {/* フォームコンポーネントを追加 */}
      <hr />
      <ChatLog />
    </div>
  );
}

export default App;