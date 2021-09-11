import React, { Component, Fragment } from 'react';

import Displayer from './components/Displayer';
import ExoManager from './components/ExoManager';
import ExoCreator from './components/ExoCreator';
import Menu from './components/Menu';
import ExoStore from './store/ExoStore';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app-component">
        <ExoStore>

          <Router>
            <Fragment>
              <Menu />
              <Displayer>
                <Route path="/" exact render={ExoManager} />
                <Route path="/create" render={ExoCreator} />
              </Displayer>
            </Fragment>
          </Router>

        </ExoStore>
      </div>
    );
  }
}

export default App;
