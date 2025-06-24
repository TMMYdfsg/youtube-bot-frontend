import React, { useEffect, useState } from "react";

/**
 * ライブ配信を取得して、YouTubeの埋め込み動画を表示するReactコンポーネント
 */
export default function LiveStreamPlayer() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * バックエンドAPIからライブ配信の状態とvideoIdを取得
   */
  const fetchLiveStatus = async () => {
    try {
      const response = await fetch("https://youtube-bot-backend.onrender.com/api/live");
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      if (data.live && data.videoId) {
        setVideoId(data.videoId);
        setError(null);
      } else {
        setVideoId(null);
      }
    } catch (err) {
      console.error("ライブ情報の取得に失敗しました:", err);
      setError("ライブ情報の取得に失敗しました");
      setVideoId(null);
    }
  };

  // 初回と15秒ごとにライブ配信状態を確認
  useEffect(() => {
    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>🎥 現在のライブ配信</h3>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {!videoId ? (
        <p>現在、ライブ配信はありません。</p>
      ) : (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <iframe
            title="Live YouTube Stream"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
