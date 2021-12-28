import React from 'react'
import ServerName from '../ServerNameDisplay/ServerName'
import ChannelsList from '../ChannelsList/ChannelsList'
import DirectMessageList from '../DirectMessageList/DirectMessageList'
import './ConversationBar.css'


export default function ConversationBar() {
    return (
        <div className='everything-container'>
            <div className='servers-bar-container'>
                <ServerName />
            </div>
            <div className='channels-bar-container'>
                <ChannelsList />
            </div>
            <div className='direct-messages-container'>
                <DirectMessageList />
            </div>
        </div>
    )
}
