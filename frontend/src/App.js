import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return <Router className="App">
    <Navbar />
    <main>
    <p>heloo</p>
    
    </main>
    <footer>
   <Footer/>
    </footer>
  </Router>;
}

export default App;
