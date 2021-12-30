import React, { useState } from 'react'
import './MessagesBox.css'

export default function MessagesBox() {
    const [message, setMessage] = useState('');

    return (
        <div className='message-box-container'>
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
