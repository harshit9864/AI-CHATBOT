import { useEffect, useMemo, useState } from "react";
import { Chat } from "./components/chat/chat";
import { Sidebar } from "./components/sidebar/sidebar";
import { Assistant } from "./assistants/googleai";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";

function App() {
  const assistant = useMemo(() => new Assistant(), []);
  const [chats, setchats] = useState([]);
  const [activechatid, setactivechatid] = useState();
  const activechatmessages = useMemo(
    () => chats.find(({ id }) => id === activechatid)?.messages ?? [],
    [chats, activechatid]
  );

  useEffect(() => {
    handlenewchatcreate();
  }, []);

  function handlechatmessagesupdate(id, messages) {
    const title = messages[0]?.content.split(" ").slice(0, 7).join(" ");
    setchats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? { ...chat, title: chat.title ?? title, messages }
          : chat
      )
    );
  }

  function handlenewchatcreate() {
    const id = uuidv4();
    setactivechatid(id);
    setchats((prev) => [...prev, { id, messages: [] }]);
  }

  function handleactivechatidchange(id) {
    setactivechatid(id);
    setchats((prev) => prev.filter(({ messages }) => messages.length > 0));
  }
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.Content}>
        <Sidebar
          chats={chats}
          activeChatid={activechatid}
          onactivechatidchange={handleactivechatidchange}
          activechatmessages={activechatmessages}
          onnewchatcreate={handlenewchatcreate}
        />
        <main className={styles.Main}>
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              assistant={assistant}
              chatid={chat.id}
              isactive={chat.id === activechatid}
              chatmessages={chat.messages}
              onchatmessagesupdate={handlechatmessagesupdate}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
