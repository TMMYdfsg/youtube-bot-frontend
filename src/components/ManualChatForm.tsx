// frontend/src/components/ManualChatForm.tsx

import React, { useState } from 'react';
import { sendMessage } from '../api';

export default function ManualChatForm() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setStatus('送信中...');
        try {
            await sendMessage(message);
            setStatus('メッセージを送信しました！');
            setMessage(''); // 送信成功したら入力欄を空にする
        } catch (error: any) {
            setStatus(`エラー: ${error.message}`);
        }
    };

    return (
        <div>
            <h3>手動チャット送信</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="送信するメッセージを入力"
                    style={{ width: '300px', marginRight: '10px' }}
                />
                <button type="submit">送信</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}