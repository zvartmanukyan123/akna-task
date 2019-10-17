import React from 'react';
import logo from './logo.svg';
import Table from './Components/Table/Table';
import Posts from './Components/Posts/Posts';
import './App.css';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/users' exact component={Table}/>
          <Route path='/users/:userId/posts' exact component={Posts}/>
        </Switch>

        <Redirect from='/' to='users'/>
      </div>
    </Router>
  );
}

export default App;
