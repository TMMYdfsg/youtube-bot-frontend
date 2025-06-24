// frontend/src/components/LiveStreamPlayer.tsx

import React, { useEffect, useState } from 'react';
import { fetchBotStatus } from '../api';

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

    // 最初に一度実行
    checkStatus();
    // その後15秒ごとにステータスを確認
    const interval = setInterval(checkStatus, 15000); 

    // コンポーネントが不要になった時にタイマーを解除
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

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <h3>現在のライブ配信</h3>
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
