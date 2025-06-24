import React, { useEffect, useState } from "react";
import { fetchGameDetails, fetchKeywordsForGame } from "../api";

interface Props {
  onKeywordsSelected: (keywords: string[], game: string) => void;
}

interface GameInfo {
  game: string;
  keywords: string[];
  icon?: string;
  description?: string;
}

export default function GameSelector({ onKeywordsSelected }: Props) {
  const [games, setGames] = useState<GameInfo[]>([]);
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    fetchGameDetails().then(setGames);
  }, []);

  const handleStart = async () => {
    const keywords = await fetchKeywordsForGame(selectedGame);
    onKeywordsSelected(keywords, selectedGame);
  };

  return (
    <div>
      <h3>🎮 ゲームを選択してください</h3>
      <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
        <option value="">--ゲームを選んでください--</option>
        {games.map((game, i) => (
          <option key={i} value={game.game}>
            {game.icon} {game.game}
          </option>
        ))}
      </select>
      <button onClick={handleStart} disabled={!selectedGame} style={{ marginLeft: "10px" }}>
        このゲームの配信を監視する
      </button>

      {/* 選択されたゲームの詳細表示 */}
      {selectedGame && (
        <div style={{ marginTop: "10px" }}>
          {games
            .filter((g) => g.game === selectedGame)
            .map((g, i) => (
              <div key={i}>
                <p><strong>{g.description}</strong></p>
                <p>🔑 キーワード: {g.keywords.join("、")}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
