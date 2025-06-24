import React, { useEffect, useState } from "react";
import { fetchGames, fetchKeywordsForGame } from "../api";

interface Props {
  onKeywordsSelected: (keywords: string[], game: string) => void;
}

export default function GameSelector({ onKeywordsSelected }: Props) {
  const [games, setGames] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  const handleStart = async () => {
    if (!selectedGame) return;
    const keywords = await fetchKeywordsForGame(selectedGame);
    onKeywordsSelected(keywords, selectedGame);
  };

  return (
    <div>
      <h3>🎮 ゲームを選択してください</h3>
      <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
        <option value="">--選択してください--</option>
        {games.map((game, i) => (
          <option key={i} value={game}>{game}</option>
        ))}
      </select>
      <button onClick={handleStart} disabled={!selectedGame} style={{ marginLeft: "10px" }}>
        このゲームの配信を監視する
      </button>
    </div>
  );
}
