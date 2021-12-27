import React, { useState } from 'react'
import { editAServer } from '../../store/server'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './ChannelEditForm.css'

export default function ChannelEditForm({setOpen}) {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const owner_id = useSelector(state => state.session.user.id)
    const { specificServerId } = useParams();

    const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const serverInformation = {
            name,
            owner_id
        }
        const data = await dispatch(editAServer(serverInformation, specificServerId))
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

