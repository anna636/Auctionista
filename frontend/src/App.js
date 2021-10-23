import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuctionItemProvider from "./contexts/AuctionItemContext";

function App() {
  return (
    <div className="App">
      <AuctionItemProvider>
            <Router>
                  <Navbar />
                  <main>
                    <Route path="/" exact component={Home} />
                  </main>
          <footer>
            <div style={styles.line}> </div>
                    <Footer />
                  </footer>
                    </Router>
      </AuctionItemProvider>
    </div>
  );
}

export default App;

const styles = {
  line: {
    widht: "100%",
    height: "1vh",
    backgroundColor: "pink"
  }
}
