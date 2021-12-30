import React, { useState } from 'react'
import './MessagesBox.css'

export default function MessagesBox({channelName}) {
    const [message, setMessage] = useState('');

    return (
        <div className='message-box-container'>
            <div className='input-container'>
                <input
                type='text'
                placeholder={channelName ? `Message ${channelName}` : null}
                value={message}
                className='new-message-input message-input'
                onChange={(e) => setMessage(e.target.value)}
                />
            </div>
        </div>
    )
}

