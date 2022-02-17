import { useRef, useState } from "react";
import axios from "axios";

export const WebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const socket = useRef();

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Connection closed.");
    };
    socket.current.onerror = () => {
      console.log("An error has occurred.");
    };
  };

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="enter your name"
          />
          <button onClick={connect}>enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
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
            <div key={message.id}>
              {message.event === "connection" ? (
                <div className="connection_message">
                  The user {message.username} has connected.
                </div>
              ) : (
                <div className="message">
                  {message.username}. {message.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
