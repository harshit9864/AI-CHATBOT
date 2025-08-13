import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./controls.module.css";

export function Controls({ isdisabled = false, onsend }) {
  const textarearef = useRef(null);
  const [content, setcontent] = useState("");
  useEffect(() => {
    if (!isdisabled) {
      textarearef.current.focus();
    }
  }, [isdisabled]);

  function handlecontentchange(event) {
    setcontent(event.target.value);
  }

  function handlecontentsend() {
    if (content.length > 0) {
      onsend(content);
      setcontent("");
    }
  }
  function handleenterpress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handlecontentsend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textarearef}
          className={styles.TextArea}
          disabled={isdisabled}
          placeholder="Message AI Chatbot"
          value={content}
          minRows={1}
          maxRows={4}
          onChange={handlecontentchange}
          onKeyDown={handleenterpress}
        />
      </div>
      <button
        onClick={handlecontentsend}
        className={styles.Button}
        disabled={isdisabled}
      >
        <Sendicon />
      </button>
    </div>
  );
}

function Sendicon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
