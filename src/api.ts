// frontend/src/api.ts (ログイン機能なし・シンプル版)

// ★デプロイ時は、このURLをRenderのバックエンドURLに書き換えてください
const API_BASE_URL = "https://youtube-bot-backend.onrender.com";

// --- Botデータ関連API ---

export const fetchBotStatus = async () => {
    // ログイン不要になったため、credentialsの記述を削除
    return fetch(`${API_BASE_URL}/api/status`).then(handleResponse);
};

export const fetchChatLog = async () => {
    return fetch(`${API_BASE_URL}/api/chat-log`).then(handleResponse);
};

export const sendMessage = async (message: string) => {
    return fetch(`${API_BASE_URL}/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    }).then(handleResponse);
};

// --- 共通レスポンス処理 ---
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error || 'API request failed');
        } catch (e) {
            throw new Error(errorText || 'API request failed with non-JSON response');
        }
    }
    return response.json();
};
