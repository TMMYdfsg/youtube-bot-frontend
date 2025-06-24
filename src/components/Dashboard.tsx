// frontend/src/components/Dashboard.tsx

import React from 'react';

// --- このダッシュボードで使う部品（コンポーネント）をインポート ---
import BotStatus from './BotStatus';
import ChatLog from './ChatLog';
import ManualChatForm from './ManualChatForm';
import LiveStreamPlayer from './LiveStreamPlayer';

// --- 背景画像をインポート ---
// ファイル名は、あなたが 'src/assets/images/' に入れた画像の名前に合わせて変更してください
import customBackgroundImage from '../assets/images/my-background.jpg'; 

// --- このコンポーネントが受け取るデータの型を定義 ---
interface DashboardProps {
  onLogout: () => void;
}

// --- メインダッシュボードのコンポーネント本体 ---
const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  // --- スタイル定義 ---
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
      <button 
        onClick={onLogout} 
        style={{
          position: 'absolute', 
          top: 15, 
          right: 15, 
          cursor: 'pointer', 
          padding: '8px 12px', 
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#f44336',
          color: 'white'
        }}
      >
        ログアウト
      </button>

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
