import React, { useState } from 'react'
import { postMessageToServer } from '../../store/server';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DisplayMessages from '../DisplayMessages/DisplayMessages'
import './MessagesBox.css'

export default function MessagesBox({channelName}) {
    const [message, setMessage] = useState('');
    const sessionUserId = useSelector(state => state.user?.id)
    const { specificServerId, specificChannelId } = useParams() 
    const dispatch  = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageInformation = {
            content: message,
            specificChannelId: +specificChannelId,
            sessionUserId: +sessionUserId
        }
        if(messageInformation) {
            await dispatch(postMessageToServer(messageInformation, +specificServerId)).then(setMessage(''));
        }
    }

    return (
        <>
            <div className='message-box-container'>
                <div className='display-messages-container'>
                    <DisplayMessages />
                </div>
            </div>
                <div className='input-container'>
                    <input
                    type='text'
                    placeholder={channelName ? `Message ${channelName}` : null}
                    value={message}
                    className='new-message-input message-input'
                    onChange={(e) => setMessage(e.target.value)}
                    onSubmit={handleSubmit}
                    />
                    <button onClick={handleSubmit}>click</button>
                </div>
        </>
    )
}

