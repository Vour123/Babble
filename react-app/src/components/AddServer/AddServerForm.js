import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import { addServer } from '../../store/server';

export default function AddServerForm({setShowModal}) {
    const [name, setName] = useState('')
    const [image_url, setImage_url] = useState('')
    const [priv, setPriv] = useState(false)
    const [errors, setErrors] = useState([])

    const owner_id = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        const serverInformation = {
            name,
            image_url,
            priv,
            owner_id
        }
        const data = await dispatch(addServer(serverInformation))
        if(data.errors) {
            setErrors(data.errors)
        } else {
            history.push(`/servers/${data.id}`)
            setShowModal(false)
        }
    }

    return (
        <form className='add-server-form' onSubmit={handleClick}>
            <input
                type='text'
                placeholder='Server Name'
                value={name}
                className='new-server-modal-input server-name-input'
                onChange={(e) => setName(e.target.value)}
            /> 
            <input
                type='text'
                placeholder='Image URL'
                value={image_url}
                className='new-server-modal-input server-image-input'
                onChange={(e) => setImage_url(e.target.value)}
            />  
            <button className='new-server-button'>Create new server</button>
        </form>
    )
}
