import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ClientContainer from './client/container/container';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeMenuItem: 'home' };
  }

  setHomeNavItemActive = () => {
    this.setState({ activeMenuItem: 'home' });
  }

  setAdminNavItemActive = () => {
    this.setState({ activeMenuItem: 'admin' });
  }

  render() {
    return (
      <Router>
        <div className={'h-100'}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <li className={"nav-item " + (this.state.activeMenuItem === 'home' && 'active')} data-name="home" onClick={this.setHomeNavItemActive}>
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className={"nav-item " + (this.state.activeMenuItem === 'admin' && 'active')} data-name="admin" onClick={this.setAdminNavItemActive}>
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return <ClientContainer />;
}

function Admin() {
  return <h2>Admin</h2>;
}

export default App;