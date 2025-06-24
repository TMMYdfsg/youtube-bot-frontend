// frontend/src/api.ts (分析機能付き 最終版)

// ★デプロイ時は、このURLをRenderのバックエンドURLに設定してください
const API_BASE_URL = "https://youtube-bot-backend.onrender.com";

// --- Botデータ関連API ---

export const fetchLiveVideo = async () =>
  fetch("https://youtube-bot-backend.onrender.com/api/live").then((res) => res.json());

export const fetchBotStatus = async () => {
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

export const testGemini = async (message: string): Promise<string> => {
  const response = await fetch("https://youtube-bot-backend.onrender.com/api/test-gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Gemini API呼び出し失敗");
  }

  const data = await response.json();
  return data.response;
};

// ★★★ 分析用APIを呼び出す関数を新しく追加 ★★★
export const analyzeUser = async (author: string) => {
    return fetch(`${API_BASE_URL}/api/analyze-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author }),
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
