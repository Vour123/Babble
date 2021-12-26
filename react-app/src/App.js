import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ServerListBar from './components/ServerListBar/ServerListBar';
import ConversationBar from './components/ConversationsBar/ConversationBar';
import User from './components/User';
import { getAllServers } from './store/server';
import { authenticate, login } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllServers())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <NavBar />
          <div>splash page</div>
        </Route>
        <ProtectedRoute path='/servers' exact={true} >
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:specificServerId' >
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
