import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import {Container} from "./components/Grid";

const App = () =>
  <Router>
    <Container fluid>
      <Jumbotron>
        <h1>NYT React Search</h1>
      </Jumbotron>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Router>;

export default App;
