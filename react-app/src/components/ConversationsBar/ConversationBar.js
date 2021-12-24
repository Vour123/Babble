import React from 'react'
import ServerName from '../ServerNameDisplay/ServerName'
import ChannelsList from '../ChannelsList/ChannelsList'


export default function ConversationBar() {
    return (
        <div className='everything-container'>
            <div className='conversations-bar-container'>
                <ServerName />
            </div>
            <div className='channels-bar-container'>
                <ChannelsList />
            </div>
            <div className='direct-messages-container'>
                {/*dm's  */}
            </div>
        </div>
    )
}
