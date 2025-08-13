import { useState } from "react";
import styles from "./sidebar.module.css";

export function Sidebar({
  chats,
  activeChatid,
  onactivechatidchange,
  onnewchatcreate,
  activechatmessages,
}) {
  const [isopen, setisopen] = useState(false);
  function handlesidebartoggle() {
    setisopen(!isopen);
  }
  function handleescapeclick(event) {
    console.log(event);
    if (isopen && event.key === "Escape") {
      setisopen(false);
    }
  }

  function handlechatclick(chatid) {
    onactivechatidchange(chatid);
    if (isopen) {
      setisopen(false);
    }
  }

  return (
    <>
      <button
        onClick={handlesidebartoggle}
        className={styles.MenuButton}
        onKeyDown={handleescapeclick}
      >
        <Menuicon />
      </button>
      <div className={styles.Sidebar} data-open={isopen}>
        <button
          className={styles.NewChatButton}
          onClick={onnewchatcreate}
          disabled={activechatmessages.length === 0}
        >
          New Chat
        </button>
        <ul className={styles.Chats}>
          {chats
            .filter(({ messages }) => messages.length > 0)
            .map((chat) => (
              <li
                key={chat.id}
                data-active={chat.id === activeChatid}
                className={styles.Chat}
                onClick={() => handlechatclick(chat.id)}
              >
                <button className={styles.ChatButton}>
                  <div className={styles.ChatTitle}>{chat.title}</div>
                </button>
              </li>
            ))}
        </ul>
      </div>
      {isopen && (
        <div className={styles.Overlay} onClick={handlesidebartoggle} />
      )}
    </>
  );
}

function Menuicon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}
