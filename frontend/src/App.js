import "./App.css";
import KPIemotions from "./components/KPIs/KPI_emotions";
// import Emotion from "./components/Emotion";

function App() {
  return (
    <div className="App">
      <div style={{ width: "100vw", height: "100vh" }}>
        <KPIemotions />
        {/* <Emotion topic="deportes"/>  */}
      </div>
    </div>
  );
}

export default App;
