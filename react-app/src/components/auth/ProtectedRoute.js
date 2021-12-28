import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ServerListBar from '../ServerListBar/ServerListBar';
import ConversationBar from '../ConversationsBar/ConversationBar';
import ChannelNameBar from '../ChannelNameBar/ChanneNameBar';
import MessagesBox from '../MessagesBox/MessagesBox';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  // const channels = useSelector(state => Object.values(state.server[serverInt]?.channels))

  return (
    <>
      <div className='protected-route-box'>
        <Route {...props}>
          <ServerListBar />
          <ConversationBar />
          <ChannelNameBar />
          {(user)? props.children : <Redirect to='/' />}
        </Route>
      </div>
    </>
  )
};


export default ProtectedRoute;
