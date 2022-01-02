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
    const server = useSelector(state => state.server);
    const user = useSelector(state => state.session.user)

    let channelsToServer;
    let serverOwnerId
    if(server) {
        serverOwnerId = server[serverInt]?.owner_id
        channelsToServer = server[serverInt]?.channels
    }

    let valuesChannelsToServer
    if(channelsToServer) {
        valuesChannelsToServer = Object.values(channelsToServer)
    }

    useEffect(() => {
        if(channelsToServer) {
            dispatch(getChannelsToServer(specificServerId))
        }
    }, [dispatch, specificServerId])


    const channelsMapped = valuesChannelsToServer?.map((singleChannel) => {
        return(
            <NavLink to={`/servers/${serverInt}/${singleChannel.id}`} key={singleChannel.id} className='channel-title'>{singleChannel.name}</NavLink>
        )
    })

    return (
        <div className='channels-container'>
            <div className='channels-header'>Channels {serverOwnerId === user.id ? <AddChannel /> : null} </div>
                {channelsMapped?.length ? channelsMapped : <div className='default-channel-msg'> Press the plus button to create a new channel!</div>}
        </div>
    )
}