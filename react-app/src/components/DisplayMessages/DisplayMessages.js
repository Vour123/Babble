import React, { useEffect } from 'react'
import { getAllMessagesOfServer } from '../../store/server'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function DisplayMessages() {
    const dispatch = useDispatch();
    const { specificServerId, specificChannelId} = useParams()
    const specificServer = useSelector(state => state.server?.[specificServerId])

    let channelsToServer;
    let specificChannel;
    let messagesToChannel
    if(specificServer) {
        channelsToServer = specificServer?.channels;
        specificChannel = channelsToServer[specificChannelId]
        if(specificChannel) {
            messagesToChannel = Object.values(specificChannel.messages)
        }
    }

    useEffect(() => {
        dispatch(getAllMessagesOfServer(specificServerId, specificChannelId))
    },[dispatch, specificChannelId])

    return (
        <>
                {messagesToChannel?.map((message) => {
                    return (
                        <div className='message'>
                            {message?.id}
                            {message?.content}
                        </div>
                    )
                })}
        </>
    )
}
