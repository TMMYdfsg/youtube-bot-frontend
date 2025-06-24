import React from "react";
import BotStatus from "./components/BotStatus";
import ChatLog from "./components/ChatLog";
import LiveStreamPlayer from "./components/LiveStreamPlayer";

function App() {
  return (
    <div className="App">
      <h1>YouTube Bot 管理画面</h1>
      <BotStatus />
      <ChatLog />
      <LiveStreamPlayer /> {/* ← ライブ動画を表示 */}
    </div>
  );
}

export default App;
