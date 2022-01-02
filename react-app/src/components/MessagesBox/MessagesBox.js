import React, { useState, useRef, useEffect } from 'react'
import { postMessageToServer } from '../../store/server';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DisplayMessages from '../DisplayMessages/DisplayMessages'
import SendIcon from '@mui/icons-material/Send';
import './MessagesBox.css'

export default function MessagesBox({channelName}) {
    const [message, setMessage] = useState('');
    const endOfChatRef = useRef(null)
    // const bottomOfMessages = useRef(document.getElementById('scroll-to-here'))
    const sessionUser= useSelector(state => state.session)
    const userId = sessionUser?.user.id
    const { specificServerId, specificChannelId } = useParams() 
    const dispatch  = useDispatch();

    const scrollToBottom = () => {
        endOfChatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // const startAtBottom = () => {
    //     bottomOfMessages.current.scrollIntoView();
    // }

    // const messageBox = document.getElementById('scroll-to-here')

    useEffect(() => {
        // if(messageBox){
        //     messageBox.scrollIntoView();
        // }
        // startAtBottom()
    })
    
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
        scrollToBottom()
    }

    return (
        <>
            <div className='message-box-container'>
                <div className='display-messages-container'>
                    <DisplayMessages endOfChatRef={endOfChatRef}/>
                </div>
            </div>
                <form className='input-container' onSubmit={handleSubmit}>
                    <input
                    type='text'
                    placeholder={channelName ? `Message ${channelName}` : null}
                    value={message}
                    className='new-message-input message-input'
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!specificChannelId}
                    />
                    <button disabled={!message} className='send-message' type='submit'><SendIcon  /></button>
                </form>
        </>
    )
}

