// frontend/src/components/ChatLog.tsx

import React, { useEffect, useState, useRef } from 'react';
import { fetchChatLog } from '../api';

// ログエントリの型を定義
interface LogEntry {
  type: 'user' | 'bot' | 'system';
  author: string;
  message: string;
  timestamp: string;
}

export default function ChatLog() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const data = await fetchChatLog();
        setLog(data);
      } catch (error) {
        console.error("Failed to fetch chat log:", error);
      }
    };
    
    getLogs();
    const interval = setInterval(getLogs, 3000); // ★★★ 3秒ごとに更新してリアルタイム感を出す

    return () => clearInterval(interval);
  }, []);

  // 新しいメッセージが来たら自動で一番下までスクロールする
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [log]);


  // --- スタイル定義 ---
  const chatContainerStyle: React.CSSProperties = {
    height: '400px',
    overflowY: 'auto',
    border: '1px solid #555',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  };

  const messageBaseStyle: React.CSSProperties = {
    maxWidth: '70%',
    padding: '8px 12px',
    borderRadius: '15px',
    marginBottom: '8px',
    wordWrap: 'break-word',
  };

  const userMessageStyle: React.CSSProperties = {
    ...messageBaseStyle,
    backgroundColor: '#333',
    alignSelf: 'flex-start', // 左寄せ
  };
  
  const botMessageStyle: React.CSSProperties = {
    ...messageBaseStyle,
    backgroundColor: '#0055aa',
    color: 'white',
    alignSelf: 'flex-end', // 右寄せ
  };
  
  const systemMessageStyle: React.CSSProperties = {
    ...messageBaseStyle,
    backgroundColor: 'transparent',
    color: '#aaa',
    fontSize: '0.8em',
    textAlign: 'center',
    width: '100%',
  };
  
  return (
    <div>
      <h3>リアルタイムチャットログ</h3>
      <div ref={chatContainerRef} style={chatContainerStyle}>
        {log.map((entry, idx) => {
          const style =
            entry.type === 'user' ? userMessageStyle :
            entry.type === 'bot' ? botMessageStyle :
            systemMessageStyle;
          
          return (
            <div key={idx} style={style}>
              {/* ユーザーコメントの場合のみ、発言者名を表示 */}
              {entry.type === 'user' && <strong>{entry.author}: </strong>}
              {entry.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}
