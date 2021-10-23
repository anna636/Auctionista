import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <Router className="App">
      <Navbar />
      <main>
        <Route path="/" exact component={Home} />
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
