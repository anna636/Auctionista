import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return <Router className="App">
    <Navbar/>
  </Router>;
}

export default App;
