import React from "react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/navbar";
import Footer from "./components/footer";
import logo from "./img/CFG_logo.png"; // Update the path to your logo file
import RoutesConfig from "./routes/routesConfig";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, currentUser, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <div className="appTitle">
          <h1>MLA Fitness App</h1>
          <img src={logo} alt="CFG Fitness App Logo" id="appLogo" />
        </div>

        <UserProvider>
          <UserContext.Consumer>
            {(context) =>
              context.isLoggedIn && (
                <NavbarComponent onLogout={context.handleLogout} />
              )
            }
          </UserContext.Consumer>

          <div className="componentContainer">
            <RoutesConfig />
          </div>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
