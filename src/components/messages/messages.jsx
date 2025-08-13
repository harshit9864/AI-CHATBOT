import { useEffect, useMemo, useRef } from "react";
import styles from "./messages.module.css";
import Markdown from "react-markdown";
const welcomemessage_group = [
  {
    role: "assistant",
    content: "Hello! How i can assist you?",
  },
];

export function Messages({ messages }) {
  const messagesendref = useRef(null);
  const messagesgroups = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") groups.push([]);
        groups[groups.length - 1].push(message);
        return groups;
      }, []),
    [messages]
  );

  useEffect(() => {
    const lastmessage = messages[messages.length - 1];
    if (lastmessage?.role === "user") {
      messagesendref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className={styles.Messages}>
      {[welcomemessage_group, ...messagesgroups].map((messages, groupindex) => (
        //Group
        <div className={styles.Group} key={groupindex}>
          {messages.map(({ role, content }, index) => (
            //Message
            <div className={styles.Message} key={index} data-role={role}>
              <div className={styles.Markdown}>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div ref={messagesendref}></div>
    </div>
  );
}
