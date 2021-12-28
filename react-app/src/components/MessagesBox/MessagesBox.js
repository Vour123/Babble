import React, { useState } from 'react'
import './MessagesBox.css'

export default function MessagesBox() {
    const [message, setMessage] = useState('');

    return (
        <div className='message-box-container'>
            this is the messaging box
            <div className='input-container'>
                <input
                type='text'
                placeholder={`Message`}
                value={message}
                className='new-message-input message-input'
                onChange={setMessage}
                />
            </div>
        </div>
    )
}
