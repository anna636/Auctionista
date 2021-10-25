import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuctionItemProvider from "./contexts/AuctionItemContext";
import CreateNewListing from "./pages/CreateNewListing";

function App() {
  return (
    <div className="App">
      <AuctionItemProvider>
        <Router>
          <Navbar />
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/create-new-listing" exact component={CreateNewListing} />
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
    backgroundColor: "rgb(226, 89, 55)",
  },
};
