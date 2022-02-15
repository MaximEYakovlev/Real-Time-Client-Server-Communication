import { useEffect, useState } from "react";
import axios from "axios";

export const LongPolling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className="center">
      <dir>
        <div className="form">
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div className="message" key={message.id}>
              {message.message}
            </div>
          ))}
        </div>
      </dir>
    </div>
  );
};
