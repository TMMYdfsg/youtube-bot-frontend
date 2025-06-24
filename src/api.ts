// frontend/src/api.ts (パスキー認証対応 最終完成版)

// ★デプロイ時は、このURLをRenderのバックエンドURLに書き換えてください
const API_BASE_URL = "https://youtube-bot-backend.onrender.com";

// --- ★★★ パスキー関連API ★★★ ---

export const passkeyRegisterRequest = (username: string) => {
    return fetch(`${API_BASE_URL}/api/passkey/register-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username }),
    }).then(handleResponse);
};

export const passkeyRegisterVerify = (body: any) => {
    return fetch(`${API_BASE_URL}/api/passkey/register-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
    }).then(handleResponse);
};

export const passkeyLoginRequest = () => {
    return fetch(`${API_BASE_URL}/api/passkey/login-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }).then(handleResponse);
};

export const passkeyLoginVerify = (body: any) => {
    return fetch(`${API_BASE_URL}/api/passkey/login-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
    }).then(handleResponse);
};

// --- 認証状態とログアウト ---

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
