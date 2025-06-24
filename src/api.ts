// frontend/src/api.ts  (ローカル開発用の正しい設定)

// 接続先サーバーの住所をここで一元管理します
const API_BASE_URL = "https://youtube-bot-backend.onrender.com";

export const fetchBotStatus = async () => {
    // 最初に定義したAPI_BASE_URLを使うようにします
    return fetch(`${API_BASE_URL}/api/status`).then(handleResponse);
};

export const fetchChatLog = async () => {
    return fetch(`${API_BASE_URL}/api/chat-log`).then(handleResponse);
};

export const sendMessage = async (message: string) => {
    return fetch(`${API_BASE_URL}/api/send-message`, { // ★★★ URLとパスを修正
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    }).then(handleResponse);
};

// レスポンスを処理する共通の関数
// これにより、JSONではないエラー（HTMLなど）が返ってきた場合にも対応できます
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        // エラーレスポンスがJSON形式でない可能性を考慮
        const errorText = await response.text();
        try {
            // JSONとして解析を試みる
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error || 'API request failed');
        } catch (e) {
            // JSONでなければ、HTMLやテキストをそのままエラーとして表示
            // これで "Unexpected token '<'" エラーの代わりに、実際のエラー内容が見えるようになります
            throw new Error(errorText || 'API request failed with non-JSON response');
        }
    }
    return response.json();
};