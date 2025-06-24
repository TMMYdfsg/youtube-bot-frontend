import React from 'react';
import BotStatus from './components/BotStatus';
import ChatLog from './components/ChatLog';
import ManualChatForm from './components/ManualChatForm';
import LiveStreamPlayer from './components/LiveStreamPlayer'; // ★★★ プレイヤーをインポート

function App() {
  return (
    <div className="App">
      <h1>YouTube Live Bot 管理画面</h1>
      <hr />
      <LiveStreamPlayer /> {/* ★★★ 好きな場所にプレイヤーを追加 */}
      <hr />
      <BotStatus />
      <hr />
      <ManualChatForm />
      <hr />
      <ChatLog />
    </div>
  );
}

export default App;
