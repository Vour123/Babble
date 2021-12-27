import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from 'react-router-dom'
import { addChannelToServer } from '../../store/server';
import { getChannelsToServer } from '../../store/server';

export default function AddChannelForm({setShowModal}) {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const { specificServerId } = useParams();
    const owner_id = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const channelInformation = {
            name,
            specificServerId: +specificServerId
        }
        const data = await dispatch(addChannelToServer(channelInformation))
        if(data.errors) {
            setErrors(data.errors)
        } else {
            setShowModal(false)
        }
        // await dispatch(getChannelsToServer(specificServerId))
    }

    return (
        <form className='add-channel-form' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Channel Name'
                value={name}
                className='new-channel-modal-input channel-name-input'
                onChange={(e) => setName(e.target.value)}
            />   
            <button className='form-channel-button'>Create new channel</button>
        </form>
    )
}
