import React, { useState } from 'react'
import { postMessageToServer } from '../../store/server';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DisplayMessages from '../DisplayMessages/DisplayMessages'
import './MessagesBox.css'

export default function MessagesBox({channelName}) {
    const [message, setMessage] = useState('');
    const sessionUser= useSelector(state => state.session)
    const userId = sessionUser?.user.id
    const { specificServerId, specificChannelId } = useParams() 
    const dispatch  = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageInformation = {
            content: message,
            channel_id: +specificChannelId,
            owner_id: +userId
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
                <form className='input-container' onSubmit={handleSubmit}>
                    <input
                    type='text'
                    placeholder={channelName ? `Message ${channelName}` : null}
                    value={message}
                    className='new-message-input message-input'
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit'>click</button>
                </form>
        </>
    )
}

