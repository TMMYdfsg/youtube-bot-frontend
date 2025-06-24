import { useEffect, useState } from 'react';
import { fetchChatLog } from '../api';

type ChatLogEntry = {
    author: string;
    message: string;
    response: string;
};

export default function ChatLog() {
    const [log, setLog] = useState<ChatLogEntry[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchChatLog().then(setLog);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>チャット履歴</h3>
            <ul>
                {log.map((entry, idx) => (
                    <li key={idx}>
                        <strong>{entry.author}:</strong> {entry.message}<br />
                        <em>→ {entry.response}</em>
                    </li>
                ))}
            </ul>
        </div>
    );
}