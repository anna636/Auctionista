import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {useEffect} from "react"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuctionItemProvider from "./contexts/AuctionItemContext";
import AuctionItemDetails from "./pages/AuctionItemDetails";
import CreateNewListing from "./pages/CreateNewListing";
import UserContextProvider from "./contexts/UserContext";


function App() {
  return (
    <div className="App">
  <UserContextProvider>    
  <AuctionItemProvider>
        <Router>
          <Navbar />
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create-new-listing" exact component={CreateNewListing} />
            <Route exact path="/details/:id" component={AuctionItemDetails} />
            </Switch>
          </main>
          <footer>
            <div style={styles.line}> </div>
            <Footer />
          </footer>
        </Router>
    </AuctionItemProvider>
    </UserContextProvider>
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
