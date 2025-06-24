// frontend/src/components/PasskeyAuth.tsx

import React, { useState } from 'react';
import {
    passkeyRegisterRequest, passkeyRegisterVerify,
    passkeyLoginRequest, passkeyLoginVerify
} from '../api';

// WebAuthnのブラウザ関数を扱うためのライブラリをインポート
// これはすでにreact-scriptsに含まれているため、追加のインストールは不要
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

interface PasskeyAuthProps {
  onLoginSuccess: () => void;
}

export default function PasskeyAuth({ onLoginSuccess }: PasskeyAuthProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  // パスキー登録処理
  const handleRegister = async () => {
    setError('');
    setInfo('パスキーを登録しています...');
    try {
      const options = await passkeyRegisterRequest(username);
      const attestation = await startRegistration(options);
      const verification = await passkeyRegisterVerify(attestation);

      if (verification.verified) {
        setInfo('登録成功！続いてログインしてください。');
      }
    } catch (err: any) {
      setError(err.message || 'パスキーの登録に失敗しました。');
      setInfo('');
    }
  };

  // パスキーログイン処理
  const handleLogin = async () => {
    setError('');
    setInfo('パスキーでログインしています...');
    try {
      const options = await passkeyLoginRequest();
      const assertion = await startAuthentication(options);
      const verification = await passkeyLoginVerify(assertion);

      if (verification.verified) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'パスキーでのログインに失敗しました。');
      setInfo('');
    }
  };

  // --- スタイル定義 (Login.tsxから流用) ---
  const containerStyle: React.CSSProperties = { /* ... */ };
  const formStyle: React.CSSProperties = { /* ... */ };
  const inputStyle: React.CSSProperties = { /* ... */ };
  const buttonStyle: React.CSSProperties = {width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px'};

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>管理者ログイン</h2>
        <p>新しいデバイスでは、まずユーザー名を決めてパスキーを登録してください。</p>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="新しいユーザー名"
          style={inputStyle}
        />
        <button onClick={handleRegister} style={buttonStyle}>
          このデバイスでパスキーを登録
        </button>

        <hr style={{margin: '20px 0'}} />

        <p>登録済みのデバイスでは、以下のボタンでログインできます。</p>
        <button onClick={handleLogin} style={buttonStyle}>
          パスキーでログイン (指紋/顔認証)
        </button>

        {error && <p style={{ color: '#ff8a80' }}>エラー: {error}</p>}
        {info && <p style={{ color: '#80d8ff' }}>{info}</p>}
      </div>
    </div>
  );
}
