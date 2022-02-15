import "./app.css";
import { LongPolling } from "./components/LongPolling";
import { EventSourceConnection } from "./components/EventSourceConnection";

function App() {
  return (
    <div>
      <EventSourceConnection />
    </div>
  );
}

export default App;
