// frontend/src/api.ts (認証機能付き 完成版)

const API_BASE_URL = "https://youtube-bot-backend.onrender.com";
// const API_BASE_URL = "https://your-bot-name.onrender.com"; // デプロイ用

// --- 認証関連API ---

// ログインを試みる関数
export const login = async (username, password) => {
    return fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ★★★ cookieをサーバーとやり取りするために必須 ★★★
        credentials: 'include', 
        body: JSON.stringify({ username, password }),
    }).then(handleResponse);
};

// ログアウトする関数
export const logout = async () => {
    return fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
    }).then(handleResponse);
};

// 現在ログインしているか確認する関数
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
