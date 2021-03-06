import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  LogoutButton  from '../auth/LogoutButton'
import './ChannelNameBar.css'
import DropDownChannel from './DropDownChannel'
import MessagesBox from '../MessagesBox/MessagesBox'
import DisplayMessages from '../DisplayMessages/DisplayMessages'

export default function ChannelNameBar() {
    const { specificChannelId, specificServerId } = useParams();
    const serverInt = +specificServerId
    const channelInt = +specificChannelId
    const channelsToSpecificServerObj = useSelector(state => state.server)
    const user = useSelector(state => state.session.user)

    let channelsToSpecificServer;
    let server;
    if(channelsToSpecificServerObj) {
        server = channelsToSpecificServerObj[serverInt]
        channelsToSpecificServer = Object.values(channelsToSpecificServerObj[serverInt]?.channels)
    }
    let channelIdx = channelsToSpecificServer?.findIndex(channel => channelInt === channel.id)
    
    let channelName;
    if(channelIdx || channelIdx === 0) {
        channelName = channelsToSpecificServer[channelIdx]?.name
    }
        
    return (
        <div className='channel-name-container-container'>
            <div className='channel-name-container'>
                {specificChannelId ? <div className='specific-channel-name'>#{channelsToSpecificServer[channelIdx]?.name} {user.id === server.owner_id ? <DropDownChannel /> : null}</div> : <div></div>}
                <LogoutButton />
            </div>
            <MessagesBox channelName={channelName}/>
        </div>
    )
}
