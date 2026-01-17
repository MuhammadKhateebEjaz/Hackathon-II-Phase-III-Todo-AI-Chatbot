"use client";

import { useState } from "react";
import "./chatbot.css"; // make sure this file exists

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // Todo App book chapters
  const bookChapters = [
    { 
      keywords: ["chapter 1", "intro", "introduction", "todo app"], 
      text: "Chapter 1: Introduction to the Todo App. This chapter covers the purpose of a Todo app, key features, and basic UI concepts."
    },
    { 
      keywords: ["chapter 2", "setup", "environment", "installation"], 
      text: "Chapter 2: Setting up the Todo App environment. You will learn how to install Node.js, initialize a React project, and configure your development environment."
    },
    { 
      keywords: ["chapter 3", "components", "react", "todo list"], 
      text: "Chapter 3: React Components for Todo App. This chapter explains how to build functional components for adding, viewing, and managing tasks."
    },
    { 
      keywords: ["chapter 4", "state", "hooks", "useState", "useEffect"], 
      text: "Chapter 4: Managing State in Todo App. Learn how to use useState and useEffect hooks to handle task state, input, and updates."
    },
    { 
      keywords: ["chapter 5", "styling", "css", "ui"], 
      text: "Chapter 5: Styling Your Todo App. Covers CSS basics, layout, and making your Todo app visually appealing."
    },
    { 
      keywords: ["chapter 6", "tasks", "crud", "add task", "delete task"], 
      text: "Chapter 6: Task Management. Explains how to add, edit, delete, and mark tasks as completed."
    },
    { 
      keywords: ["chapter 7", "local storage", "persist", "save tasks"], 
      text: "Chapter 7: Persisting Data. Learn how to use Local Storage to save tasks so they remain after a page reload."
    },
  ];

  // Function to find best matching chapter
  function getBookAnswer(input: string) {
    input = input.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    for (let chapter of bookChapters) {
      let score = 0;
      for (let kw of chapter.keywords) {
        if (input.includes(kw)) score += 2;
        else {
          const words = kw.split(" ");
          for (let w of words) if (input.includes(w)) score += 1;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = chapter.text;
      }
    }

    return maxScore > 0 
      ? bestMatch 
      : "Sorry, I only answer questions from the Todo App book.";
  }

  // Send message handler
  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    setTimeout(() => {
      const reply = getBookAnswer(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  return (
    <div id="chatbot-wrapper">
      {!open && (
        <div id="chatbot-button" onClick={() => setOpen(true)}>
          
        </div>
      )}

      {open && (
        <div id="chatbot-window">
          <div id="chatbot-header" onClick={() => setOpen(false)}>
            📚 Todo App Assistant
          </div>

          <div id="chatbox">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div id="input-area">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Ask anything about Todo App..."
            />
            <button onClick={sendMsg}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
