import "./App.css";
import Panel from "./Panel.jsx";

function App() {
  return (
    <div class="main">
      <h2>Which movie is best?</h2>
      <div class="choice-row">
        <Panel />
        <Panel />
      </div>
    </div>
  );
}

export default App;
