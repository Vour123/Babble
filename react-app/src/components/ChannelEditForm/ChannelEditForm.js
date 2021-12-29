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

    const validator = () => {
        let error = [];
        if(name.length > 15) {
            error.push('. : Please enter a name shorter than 10 characters')
        } else if (name.length < 3) {
            error.push('. : Please enter a name longer than 3 characters')
        }
        return error;
    }

    const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const errorsArr = validator();
        if(errorsArr.length) {
            setErrors(errorsArr)
        } else {
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
    }

    return (
        <form className='channel-edit-container' onSubmit={handleSubmit}>
            <div className="errors">
                        {errors.map((error, ind) => (
                        <div key={ind}>{error.split(':')[1]}</div>
                    ))}
            </div>
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

