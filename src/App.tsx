import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Petition from './components/Petition';
import NotFound from "./components/NotFound";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={"/petition"} element={<Petition/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </Router>
        </div>
  );
}

export default App;
