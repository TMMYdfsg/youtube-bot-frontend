// frontend/src/components/Login.tsx

import React, { useState } from 'react';
import { login } from '../api';

// 親コンポーネントにログイン成功を伝えるための型定義
interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(username, password);
      if (response.success) {
        onLoginSuccess(); // ログイン成功を親に伝える
      }
    } catch (err: any) {
      setError(err.message || 'ログインに失敗しました。');
    }
  };

  const loginContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const loginFormStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '40px',
    borderRadius: '15px',
    textAlign: 'center',
    width: '350px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#333',
    color: 'white',
  };

  return (
    <div style={loginContainerStyle}>
      <form onSubmit={handleLogin} style={loginFormStyle}>
        <h2>管理者ログイン</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名"
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          style={inputStyle}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
          ログイン
        </button>
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </form>
    </div>
  );
}
