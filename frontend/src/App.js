import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuctionItemProvider from "./contexts/AuctionItemContext";
import AuctionItemDetails from "./pages/AuctionItemDetails";
import CreateNewListing from "./pages/CreateNewListing";
import UserContextProvider from "./contexts/UserContext";
import BidProvider from "./contexts/BidContext";
import MyListings from "./pages/MyListings";
import MyMessages from "./pages/MyMessages";
import MyProfile from "./pages/MyProfile";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <AuctionItemProvider>
          <BidProvider>
            <Router>
              <Navbar />
              <main>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route
                    path="/create-new-listing"
                    exact
                    component={CreateNewListing}
                  />
                  <Route
                    exact
                    path="/details/:id"
                    component={AuctionItemDetails}
                  />
                  <Route exact path="/my-listings" component={MyListings} />
                  <Route exact path="/my-messages" component={MyMessages} />
                  <Route exact path="/my-profile" component={MyProfile} />
                  <Route exact path="/chat/:sellerid" component={Chat} />
                </Switch>
              </main>
              <footer>
                <div style={styles.line}> </div>
                <Footer />
              </footer>
            </Router>
          </BidProvider>
        </AuctionItemProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;

const styles = {
  line: {
    width: "100%",
    height: "0.3rem",
    backgroundColor: "#949c54",
  },
};
