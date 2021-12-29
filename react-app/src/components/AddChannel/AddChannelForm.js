import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from 'react-router-dom'
import { addChannelToServer } from '../../store/server';
import { getChannelsToServer } from '../../store/server';
import './AddChannel.css'

export default function AddChannelForm({setShowModal}) {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const { specificServerId } = useParams();
    const dispatch = useDispatch();

    const validator = () => {
        let error = [];
        if(name.length > 15) {
            error.push('. : Please enter a name shorter than 10 characters')
        } else if (name.length < 3) {
            error.push('. : Please enter a name longer than 3 characters')
        }
        return error;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errorsArr = validator();
        if(errorsArr.length) {
            setErrors(errorsArr)
        } else {
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
        }
    }

    return (
        <form className='add-channel-form' onSubmit={handleSubmit}>
            <div className="errors">
                        {errors.map((error, ind) => (
                        <div key={ind}>{error.split(':')[1]}</div>
                    ))}
            </div>
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
