import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ServerListBar from '../ServerListBar/ServerListBar';
import ConversationBar from '../ConversationsBar/ConversationBar';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)

  return (
    <div className='protected-route-box'>
      <Route {...props}>
        <ServerListBar />
        <ConversationBar />
        {(user)? props.children  : <Redirect to='/' />}
      </Route>
    </div>
  )
};


export default ProtectedRoute;
