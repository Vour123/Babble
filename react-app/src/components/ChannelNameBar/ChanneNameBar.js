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
    console.log('this is the server', channelsToSpecificServerObj)

    let channelsToSpecificServer;
    if(channelsToSpecificServerObj) {
        channelsToSpecificServer = Object.values(channelsToSpecificServerObj[serverInt]?.channels)
    }
    const channelIdx = channelsToSpecificServer?.findIndex(channel => channelInt === channel.id)

    let channelName;
    if(channelIdx) {
        channelName = channelsToSpecificServer[channelIdx]?.name
    }
    

    return (
        <div className='channel-name-container-container'>
            <div className='channel-name-container'>
                {specificChannelId ? <div className='specific-channel-name'>#{channelsToSpecificServer[channelIdx]?.name} <DropDownChannel /> </div> : <div></div>}
                <LogoutButton />
            </div>
            <DisplayMessages />
            <MessagesBox channelName={channelName}/>
        </div>
    )
}
