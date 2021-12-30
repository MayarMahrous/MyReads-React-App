import React from 'react'
import './App.css'
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import { Route, useHistory, Switch } from 'react-router-dom';

function BooksApp() {
  
  //For refreshing page in '/search'
  const history = useHistory();
  history.push('/');
  
  return (
    <div className="app">
      <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/search' component={SearchPage} />
      </Switch>
    </div>
  )
}

export default BooksApp;
