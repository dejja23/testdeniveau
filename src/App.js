import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import PostList from './components/PostList';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={UserList} />
        <Route exact path='/posts/:id' component={PostList} />
        <Route exact path='/details/:id' component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
