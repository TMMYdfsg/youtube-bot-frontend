// frontend/src/components/Dashboard.tsx (ログイン機能削除版)

import React from 'react';

// --- コンポーネントのインポート ---
import BotStatus from './BotStatus';
import ChatLog from './ChatLog';
import ManualChatForm from './ManualChatForm';
import LiveStreamPlayer from './LiveStreamPlayer';

// --- 背景画像をインポート ---
import customBackgroundImage from '../assets/images/my-background.jpg'; 

// ★★★ onLogoutを受け取らないように修正 ★★★
const Dashboard: React.FC = () => {
  // --- スタイル定義 (変更なし) ---
  const appStyle: React.CSSProperties = {
    backgroundImage: `url(${customBackgroundImage})`,
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
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
  };
  
  // --- 画面に表示する内容（JSX） ---
  return (
    <div style={appStyle}>
      {/* ★★★ ログアウトボタンを削除 ★★★ */}
      <h1 style={h1Style}>YouTube Live Bot 管理画面</h1>
      
      <div style={sectionStyle}>
        <LiveStreamPlayer />
      </div>
      
      <div style={sectionStyle}>
        <BotStatus />
      </div>

      <div style={sectionStyle}>
        <ManualChatForm />
      </div>

      <div style={sectionStyle}>
        <ChatLog />
      </div>
    </div>
  );
};

export default Dashboard;
