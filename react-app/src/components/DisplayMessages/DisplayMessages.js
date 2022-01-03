import React, { useEffect, useState } from 'react'
import { getAllMessagesOfServer } from '../../store/server'
import { updateAMessage } from '../../store/server'
import ActionMessages  from './ActionMessages' 
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import './DisplayMessages.css'

export default function DisplayMessages({endOfChatRef}) {
    const dispatch = useDispatch();
    const [messageId, setMessageId] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [message, setMessage] = useState('')
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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const messageInformation = {
            content: message,
            server_id: +specificServerId,
            channel_id: +specificChannelId,
            message_id: +messageId
        }
        dispatch(updateAMessage(messageInformation))
        setEditMode(!editMode)
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
                            [editMode === true ? 
                            <div key={message.id} className='message' onDoubleClick={() => {setEditMode(!editMode); setMessageId(message.id)}}>
                                {message.id == messageId ? 
                                <>
                                    <img className='user-image' src={message?.owner.image_url}></img>
                                    <form className='edit-message-form' onSubmit={handleEditSubmit}>
                                        <input className='edit-message-input' type='text' defaultValue={message?.content} onChange={(e) => setMessage(e.target.value)}/>
                                        <button type='submit' className='edit-message-btn'><CheckIcon/></button>
                                        <button onClick={() => setEditMode(!editMode)} className='delete-btn'><CancelIcon/></button>
                                    </form> 
                                </>
                                : 
                                <>
                                    <img className='user-image' src={message?.owner.image_url}></img>
                                    <div className='actual-message-content'>
                                        {message?.content}
                                    </div>

                                    <div className='action-btns-message'>
                                        {message.id === messageId ? <ActionMessages
                                        messageId={message.id} 
                                        channelId={specificChannelId}
                                        serverId={specificServerId}
                                        setEditMode={setEditMode}
                                        editMode={editMode}
                                        /> : null}
                                    </div>
                                </>
                                }
                            </div> 
                            : 
                            <div key={message.id} ref={endOfChatRef} onDoubleClick={() => setEditMode(!editMode)} onMouseOver={() => setMessageId(message.id)} onMouseLeave={() => setMessageId('')} className='message'>
                                <img className='user-image' src={message?.owner.image_url}></img>
                                <div className='actual-message-content'>
                                    {message?.content}
                                </div>

                                <div className='action-btns-message'>
                                    {message.id === messageId ? <ActionMessages
                                     messageId={message.id} 
                                     channelId={specificChannelId}
                                     serverId={specificServerId}
                                     setEditMode={setEditMode}
                                     editMode={editMode}
                                     /> : null}

                                </div>
                            </div> ]
                            :<div key={message.id} ref={endOfChatRef} className='message'>
                                        <img className='user-image' src={message?.owner.image_url}></img>
                                        <div className='actual-message-content'>
                                            {message?.content}
                                        </div>
                            </div>}
                        </>
                    )
                })}
                <div id='scroll-to-here'></div>
            </div> : <div className='message'>No messages here</div>}
        </>
    )
}
