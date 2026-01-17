import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>💬</div>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">Chatbot Assistant</div>
          <div className="chatbot-body">
            <p><b>Bot:</b> Hello! How can I help you?</p>
          </div>
          <input placeholder="Type your message..." />
        </div>
      )}
    </>
  );
}
