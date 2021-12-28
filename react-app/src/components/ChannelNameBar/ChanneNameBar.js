import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  LogoutButton  from '../auth/LogoutButton'
import './ChannelNameBar.css'
import DropDownChannel from './DropDownChannel'
import MessagesBox from '../MessagesBox/MessagesBox'

export default function ChannelNameBar() {
    const { specificChannelId, specificServerId } = useParams();
    const serverInt = +specificServerId
    const channelInt = +specificChannelId
    const channelsToSpecificServer = useSelector(state => Object.values(state.server[serverInt]?.channels))

    const channelIdx = channelsToSpecificServer?.findIndex(channel => channelInt === channel.id)
    

    return (
        <div className='channel-name-container-container'>
            <div className='channel-name-container'>
                <div className='specific-channel-name'>#{channelsToSpecificServer[channelIdx]?.name} <DropDownChannel /> </div>
                <LogoutButton />
            </div>
            <MessagesBox />
        </div>
    )
}
