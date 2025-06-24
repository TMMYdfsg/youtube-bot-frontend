// frontend/src/api.ts (型定義エラー修正版)

// const API_BASE_URL = "http://localhost:5000"; // ローカル開発用
const API_BASE_URL = "https://your-bot-name.onrender.com"; // デプロイ用

// --- 認証関連API ---

// ★★★ 引数に string 型を指定 ★★★
export const login = async (username: string, password: string) => {
    return fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ username, password }),
    }).then(handleResponse);
};

export const logout = async () => {
    return fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
    }).then(handleResponse);
};

export const checkAuth = async () => {
    return fetch(`${API_BASE_URL}/api/check-auth`, {
        credentials: 'include',
    }).then(handleResponse);
};


// --- Botデータ関連API ---

export const fetchBotStatus = async () => {
    return fetch(`${API_BASE_URL}/api/status`, { credentials: 'include' }).then(handleResponse);
};

export const fetchChatLog = async () => {
    return fetch(`${API_BASE_URL}/api/chat-log`, { credentials: 'include' }).then(handleResponse);
};

export const sendMessage = async (message: string) => {
    return fetch(`${API_BASE_URL}/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
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
