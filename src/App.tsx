import React, {JSX} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Petitions from './components/Petitions';
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Petition from "./components/Petition";
import Register from "./components/Register";
import Login from "./components/Login";
import CreatePetition from "./components/CreatePetition";
import {loginState} from "./store";
import UserProfile from "./components/UserProfile";

function App() {

    const auth = loginState(state => state.token);

    const checkLogin = (component: JSX.Element) => {

        return (auth !== "") ? component : <Login/>;
    }


    return (
        <div className="App">
            <NavBar/>
            <Router>
                <Routes>
                    <Route path={""} element={<Navigate to={'/petitions'}/>}/>
                    <Route path={"/petitions"} element={<Petitions/>}/>
                    <Route path={"/petitions/:id"} element={<Petition/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/petitions/create"} element={checkLogin(<CreatePetition/>)}/>
                    <Route path={"/petitions/:id/edit"} element={<CreatePetition/>}/>
                    <Route path={"/users/:id"} element={<UserProfile/>}/>
                    <Route path={"/users/:id/edit"} element={<UserProfile/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </Router>
        </div>
  );
}

export default App;
