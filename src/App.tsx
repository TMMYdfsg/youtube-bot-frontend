import React from "react";
import BotStatus from "./components/BotStatus";
import ChatLog from "./components/ChatLog";
import LiveStreamPlayer from "./components/LiveStreamPlayer";
import ManualChatForm from "./components/ManualChatForm";
import GameSelector from "./components/GameSelector";
import KeywordHighlighter from "./components/KeywordHighlighter";
import ChatInput from "./components/ChatInput";

function App() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>("");

  return (
    <div className="App">
      <h1>YouTube Bot 管理画面</h1>
      <BotStatus />
      <LiveVideo />
      <GameSelector onKeywordsSelected={(keywords, game) => {
        setSelectedKeywords(keywords);
        setSelectedGame(game);
      }} />
      <KeywordHighlighter keywords={selectedKeywords} game={selectedGame} />
      <ChatLog />
      <ChatInput />
    </div>
  );
}
