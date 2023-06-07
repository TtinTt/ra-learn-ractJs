import "./App.css";
import CountClick from "./components/count_click";
import CountClick2 from "./components/count_click2";
import CountText from "./components/count_text ";

function App() {
  return (
    <div className="App">
      <CountClick />
      <hr />
      <CountClick2 />
      <hr />
      <CountText />
    </div>
  );
}

export default App;
