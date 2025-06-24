import React, { useState } from "react";
import { testGemini } from "../api";

/**
 * 管理者が手動でGeminiに質問し、応答を得るフォーム
 */
export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await testGemini(message);
      setResponse(result);
    } catch (err) {
      console.error(err);
      setError("Geminiとの通信に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>💬 Geminiに手動で質問</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Geminiに聞きたいことを入力..."
          style={{ width: "60%", padding: "8px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px 16px" }} disabled={loading}>
          {loading ? "送信中..." : "送信"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {response && (
        <div style={{ marginTop: "1em", padding: "10px", background: "#f2f2f2" }}>
          <strong>Geminiの応答:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
