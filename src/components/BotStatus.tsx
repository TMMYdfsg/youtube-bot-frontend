import React, { useEffect, useState } from 'react';
import { fetchBotStatus } from '../api';

export default function BotStatus() {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        fetchBotStatus().then(data => setStatus(data.bot_running));
    }, []);

    return (
        <div>
            <h3>Botの状態</h3>
            <p>{status ? "🟢 稼働中" : "🔴 停止中"}</p>
        </div>
    );
}
