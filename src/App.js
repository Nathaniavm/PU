import './App.css';
import React from "react";
import Navbar from "./common/navbar/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Hjem, OpprettLeker, LoggInn, MinSide, NewUser, Games, SpinTheWheel} from './pages';
 
function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Hjem/>} />
              <Route path="/opprettleker" element={<OpprettLeker />} />
              <Route path="/logginn" element={<LoggInn />} />
              <Route path="/minside" element={<MinSide />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/game/:gameID" element={<Games />} />
              <Route path="/spinthewheel" element={<SpinTheWheel />} />
          </Routes>
      </Router>
  );
}

export default App;
