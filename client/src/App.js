import { Home, Landing, Form, Detail } from "./views/index";
import { Route, useLocation } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import style from "../src/views/Landing/Landing.module.css";


function App() {
  return (
    <body>
        {useLocation().pathname !== "/" && <NavBar />}
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/create">
          <Form />
        </Route>
    </body>
  );
}

export default App;
