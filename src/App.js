import React from "react";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import ProductPage from "./containers/ProductPage/ProductPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import "./styles/reset.css";

import { fetchUserDataFromConnection } from "../src/actions/index";
library.add(faTimes, faLongArrowAltRight);
require("dotenv").config();

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");

  dispatch(fetchUserDataFromConnection(userToken));

  return (
    <Router>
      <Header />
      <Switch>
        <Route path={"/product/:id"}>
          <ProductPage />
        </Route>
        <Route>
          <Home path={"/"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
