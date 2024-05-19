import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Petitions from './components/Petitions';
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Petition from "./components/Petition";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Router>
                <Routes>
                    <Route path={""} element={<Navigate to={'/petitions'}/>}/>
                    <Route path={"/petitions"} element={<Petitions/>}/>
                    <Route path={"/petitions/:id"} element={<Petition/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </Router>
        </div>
  );
}

export default App;
