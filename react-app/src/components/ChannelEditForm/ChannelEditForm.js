import React, { useState } from 'react'
import { updateChannelToServer } from '../../store/server'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './ChannelEditForm.css'

export default function ChannelEditForm({setOpen}) {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const { specificServerId, specificChannelId } = useParams();

    const channelsToSpecificServer = useSelector(state => Object.values(state.server[specificServerId]?.channels))
    const channelIdx = channelsToSpecificServer?.findIndex(channel => specificChannelId == channel.id)
    const specificChannel = channelsToSpecificServer[channelIdx];

    const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const channelInformation = {
            name,
            id: +specificChannelId,
            messages: specificChannel?.messages,
            server_id: specificChannel?.server_id
        }
        const data = await dispatch(updateChannelToServer(channelInformation, specificServerId, specificChannelId))
        if(data.errors) {
            setErrors(data.errors)
        } else {
            setOpen(false)
        }
    }

    return (
        <form className='channel-edit-container' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Channel Name'
                value={name}
                className='edit-channel-modal-input edit-channel-name-input'
                onChange={(e) => setName(e.target.value)}
            />  
            <button className='edit-channel-button'>Edit existing channel</button>
        </form>
    )
}

