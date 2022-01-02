import React, { useEffect, useState } from 'react'
import { getAllMessagesOfServer } from '../../store/server'
import ActionMessages  from './ActionMessages' 
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function DisplayMessages({endOfChatRef}) {
    const dispatch = useDispatch();
    const [messageId, setMessageId] = useState('')
    const { specificServerId, specificChannelId} = useParams()
    const specificServer = useSelector(state => state.server?.[specificServerId])
    const user = useSelector(state => state.session.user)

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
            {messagesToChannel?.length != 0 ? <div className='messages-displayed'>
                {messagesToChannel?.map((message) => {
                    return (
                        <>
                            {message.owner.id === user.id ? 
                            <div key={message.id} ref={endOfChatRef} onMouseEnter={() => setMessageId(message.id)} onMouseLeave={() => setMessageId('')} className='message'>
                                {/* {message?.owner.image_url} */}
                                <div className='actual-message-content'>
                                    {message?.id}
                                    {message?.content}
                                </div>
                                <div className='action-btns-message'>
                                    {message.id === messageId ? <ActionMessages
                                     messageId={message.id} 
                                     channelId={specificChannelId}
                                     serverId={specificServerId}
                                     /> : null}
                                </div>
                            </div> 
                            : 
                            <div key={message.id} ref={endOfChatRef} className='message'>
                                {/* {message?.owner.image_url} */}
                                {message?.id}
                                {message?.content}
                            </div>}
                        </>
                    )
                })}
                <div id='scroll-to-here'></div>
            </div> : <div className='message'>No messages here</div>}
        </>
    )
}
