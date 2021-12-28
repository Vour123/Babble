import React, { useEffect} from 'react'
import AddChannel from '../AddChannel/AddChannel'
import { getChannelsToServer } from '../../store/server'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import './ChannelsList.css'

export default function ChannelsList() {
    const { specificServerId } = useParams()
    const dispatch = useDispatch()
    const serverInt = +specificServerId
    const channelsToServer = useSelector(state => state.server[serverInt]?.channels)

    let valuesChannelsToServer
    if(channelsToServer) {
        valuesChannelsToServer = Object.values(channelsToServer)
    }


    useEffect(() => {
        dispatch(getChannelsToServer(specificServerId))
    }, [dispatch, specificServerId])


    const channelsMapped = valuesChannelsToServer?.map((singleChannel) => {
        return(
            <NavLink to={`/servers/${serverInt}/${singleChannel.id}`} key={singleChannel.id} className='channel-title'>{singleChannel.name}</NavLink>
        )
    })
    

    return (
        <div className='channels-container'>
            <div className='channels-header'>Channels <AddChannel /></div>
                {channelsMapped?.length ? channelsMapped : <div className='default-channel-msg'> Press the plus button to create a new channel!</div>}
        </div>
    )
}