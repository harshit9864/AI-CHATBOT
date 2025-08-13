import { Messages } from "../messages/messages";
import { Controls } from "../controls/controls";
import { Loader } from "../loader/loader";
import { useEffect, useState } from "react";
import styles from "./chat.module.css";

export function Chat({
  assistant,
  isactive = false,
  chatid,
  chatmessages,
  onchatmessagesupdate,
}) {
  const [messages, setmessages] = useState([]); // Store chat messages in state
  const [isloading, setisloading] = useState(false);
  const [isstreaming, setisstreaming] = useState(false);

  useEffect(() => setmessages(chatmessages), [chatid]);

  useEffect(() => {
    onchatmessagesupdate(chatid,messages);
  }, [messages]);

  function updatelastmessagecontent(content) {
    setmessages((prev) =>
      prev.map((message, index) =>
        index === prev.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addmessage(message) {
    // Add new message to state
    setmessages((prev) => [...prev, message]);
  }

  async function handlecontentsend(content) {
    // Add user message first
    addmessage({ content, role: "user" });

    setisloading(true);
    try {
      const res = await assistant.chatstream(content);
      let isfirstchunk = false;

      for await (const chunk of res) {
        if (!isfirstchunk) {
          isfirstchunk = true;
          addmessage({ content: "", role: "assistant" });
          setisloading(false);
          setisstreaming(true);
        }

        updatelastmessagecontent(chunk);
      }
      setisstreaming(false);
      // Generate assistant's reply using Gemini API
      // const result = await googleai.models.generateContent({
      //   model: "gemini-2.5-flash",
      //   contents: content,
      // });

      // Add assistant response to messages
      // const text = result.text;
    } catch (error) {
      // Handle errors and show fallback message
      console.error("🚨 Chat failed:", error);

      addmessage({
        content:
          error?.message ??
          "sorry , i couldn't process your request. please try again",
        role: "system",
      });
      setisloading(false);
      setisstreaming(false);
    }
  }

  if (!isactive) return null;

  return (
    <>
      {isloading && <Loader />}
      <div className={styles.Chat}>
        <Messages messages={messages} />
      </div>

      <Controls
        isdisabled={isloading || isstreaming}
        onsend={handlecontentsend}
      />
    </>
  );
}
