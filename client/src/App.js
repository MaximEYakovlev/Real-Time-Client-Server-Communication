import "./app.css";
import { LongPolling } from "./components/LongPolling";
import { EventSourceConnection } from "./components/EventSourceConnection";
import { WebSocket } from "./components/WebSocket";

function App() {
  return (
    <div>
      <WebSocket />
    </div>
  );
}

export default App;
