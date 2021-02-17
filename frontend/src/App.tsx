import React from 'react';
import './App.scss';
// import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import Register from './components/registration';
import { Router, Route, Switch, } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route path={"/login"} component={Login} />
          <Route path={"/profile"} component={Profile} />
          <Route path={"/register"} component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
