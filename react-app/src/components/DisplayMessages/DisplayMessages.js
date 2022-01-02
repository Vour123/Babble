import React, { useEffect, useRef } from 'react'
import { getAllMessagesOfServer } from '../../store/server'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function DisplayMessages({endOfChatRef}) {
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

    // const messageBox = document.getElementsByClassName('messages-displayed')
    // window.scrollTo(0, messageBox.scrollHeight);

    useEffect(() => {
        dispatch(getAllMessagesOfServer(specificServerId, specificChannelId))
    },[dispatch, specificChannelId])

    return (
        <>
            {messagesToChannel?.length != 0 ? <div className='messages-displayed'>
                {messagesToChannel?.map((message) => {
                    return (
                        <div key={message.id} ref={endOfChatRef} className='message'>
                            {message?.id}
                            {message?.content}
                        </div>
                    )
                })}
            </div> : <div className='message'>No messages here</div>}
        </>
    )
}
