import React, {useState} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ClientContainer from './client/container/container';
import AdminContainer from './admin/container/container';
import {Links} from './constants';
import './App.css';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState(Links.home);

  const setHomeNavItemActive = () => {
    setActiveMenuItem(Links.home);
  };

  const setAdminNavItemActive = () => {
    setActiveMenuItem(Links.admin);
  };

  return (
    <Router>
      <div className={'h-100'}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className={"nav-item " + (activeMenuItem === Links.home && 'active')} onClick={setHomeNavItemActive}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={"nav-item " + (activeMenuItem === Links.admin && 'active')} onClick={setAdminNavItemActive}>
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/admin">
            <AdminContainer />
          </Route>
          <Route path="/">
            <ClientContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;