import React, { useEffect, useState } from "react";
import { fetchChatLog } from "../api";

interface Props {
  keywords: string[];
  game: string;
}

export default function KeywordHighlighter({ keywords, game }: Props) {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const logs = await fetchChatLog();

      const matched = logs
        .filter((entry: any) =>
          keywords.some((kw) => entry.message.includes(kw))
        )
        .map((entry: any) => `${entry.author}: ${entry.message}`);

      setAlerts(matched);
    }, 5000);

    return () => clearInterval(interval);
  }, [keywords]);

  if (!game) return null;

  return (
    <div>
      <h3>🎯 {game} のキーワード反応</h3>
      {alerts.length === 0 ? (
        <p>キーワードに一致するチャットはまだありません</p>
      ) : (
        <ul>
          {alerts.map((line, i) => (
            <li key={i} style={{ color: "red" }}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
