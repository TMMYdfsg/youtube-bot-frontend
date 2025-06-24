// frontend/src/App.tsx (認証＆ローカル背景画像付き 完成版)

import React, { useState, useEffect } from 'react';
import { checkAuth, logout } from './api';

// --- コンポーネントのインポート ---
// ダッシュボードで使う部品
import BotStatus from './components/BotStatus';
import ChatLog from './components/ChatLog';
import ManualChatForm from './components/ManualChatForm';
import LiveStreamPlayer from './components/LiveStreamPlayer';
// 認証画面
import PasskeyAuth from './components/PasskeyAuth'; 

// ★★★ 1. プロジェクト内の画像をインポートします ★★★
// ファイル名は、あなたが 'src/assets/images/' に入れた画像の名前に合わせて変更してください
import customBackgroundImage from './assets/images/my-background.jpg'; 

// --- ダッシュボードコンポーネントの型定義 ---
interface DashboardProps {
  onLogout: () => void;
}

// --- メインダッシュボードのコンポーネント ---
const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  // --- スタイル定義 ---
  const appStyle: React.CSSProperties = {
    backgroundImage: `url(${customBackgroundImage})`,
    backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
    minHeight: '100vh', color: 'white', padding: '20px',
  };
  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px',
    borderRadius: '15px', marginBottom: '20px', backdropFilter: 'blur(5px)',
  };
  const h1Style: React.CSSProperties = {
    textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
  };
  
  return (
    <div style={appStyle}>
      <button onClick={onLogout} style={{position: 'absolute', top: 15, right: 15, cursor: 'pointer', padding: '8px 12px', borderRadius: '5px' }}>ログアウト</button>
      <h1 style={h1Style}>YouTube Live Bot 管理画面</h1>
      <div style={sectionStyle}><LiveStreamPlayer /></div>
      <div style={sectionStyle}><BotStatus /></div>
      <div style={sectionStyle}><ManualChatForm /></div>
      <div style={sectionStyle}><ChatLog /></div>
    </div>
  );
};

// --- アプリケーション全体のメインコンポーネント ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // アプリ起動時にログイン状態を確認
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuth();
        setIsAuthenticated(data.is_logged_in);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const handleLoginSuccess = () => setIsAuthenticated(true);
  
  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  if (isLoading) return <div>読み込み中...</div>;

  // 認証状態に応じて、パスキー認証画面かダッシュボードを表示
  return isAuthenticated ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <PasskeyAuth onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
