import { useEffect, useState } from "react";
import axios from "axios";

export const EventSourceConnection = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
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
