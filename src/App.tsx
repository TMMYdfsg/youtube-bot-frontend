// frontend/src/App.tsx

import React from 'react';
import BotStatus from './components/BotStatus';
import ChatLog from './components/ChatLog';
import ManualChatForm from './components/ManualChatForm';
import LiveStreamPlayer from './components/LiveStreamPlayer';

// プロジェクト内の画像をインポートします
// ファイル名はあなたが入れた画像の名前に合わせて変更してください
import backgroundImage from './assets/images/my-background.jpg'; 

function App() {
  // --- スタイル定義 ---

  const appStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    color: 'white',
    padding: '20px',
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    backdropFilter: 'blur(5px)',
  };

  const h1Style: React.CSSProperties = {
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
  }

  // --- JSX（画面の構造） ---
  return (
    <div style={appStyle}>
      <h1 style={h1Style}>YouTube Live Bot 管理画面</h1>
      
      <div style={sectionStyle}>
        <LiveStreamPlayer />
      </div>
      
      <div style={sectionStyle}>
        <BotStatus />
      </div>

      {/* ★★★ ここが修正箇所です ★★★ */}
      <div style={sectionStyle}> 
        <ManualChatForm />
      </div>

      <div style={sectionStyle}>
        <ChatLog />
      </div>

    </div>
  );
}

export default App;
