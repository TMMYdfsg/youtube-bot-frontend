import React, { useEffect, useState } from 'react';

// 仮のAPI関数です。実際のapi.tsに合わせてください。
const fetchBotStatus = async () => {
    const response = await fetch('http://localhost:5000/api/status');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default function LiveStreamPlayer() {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await fetchBotStatus();
        setVideoId(status.video_id);
      } catch (error) {
        console.error("Failed to fetch bot status:", error);
        setVideoId(null);
      }
    };

    checkStatus(); // 最初に一度実行
    const interval = setInterval(checkStatus, 15000); // 15秒ごとにステータスを確認

    return () => clearInterval(interval);
  }, []);

  if (!videoId) {
    return (
      <div>
        <h3>現在のライブ配信</h3>
        <p>現在、ライブ配信はありません。</p>
      </div>
    );
  }

  // YouTubeの埋め込みURLを生成
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <h3>現在のライブ配信</h3>
      {/* レスポンシブ対応の埋め込みコンテナ */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={videoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
