import React, { useState } from 'react'
import { editAServer } from '../../store/server'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './ServerEditForm.css'

export default function ServerEditForm({setOpen}) {
    const [name, setName] = useState('')
    const [image_url, setImage_url] = useState('')
    const [priv, setPriv] = useState(false)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const owner_id = useSelector(state => state.session.user.id)
    const { specificServerId } = useParams();

    const urlChecker = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    const validator = () => {
        let error = [];
        if(name.length > 15) {
            error.push('. : Please enter a name shorter than 15 characters')
        } else if (name.length < 3) {
            error.push('. : Please enter a name longer than 3 characters')
        }

        if(image_url != urlChecker) {
            error.push('. : Please enter a URL')
        }
        return error;
    }

    const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const errorsArr = validator();
        if(errorsArr.length) {
            setErrors(errorsArr)
        } else {
            const serverInformation = {
                name,
                image_url,
                priv,
                owner_id
            }
            const data = await dispatch(editAServer(serverInformation, specificServerId))
            if(data.errors) {
                setErrors(data.errors)
            } else {
                setOpen(false)
            }
        }
    }

    return (
        <form className='server-edit-container' onSubmit={handleSubmit}>
            <div className="errors">
                        {errors.map((error, ind) => (
                        <div key={ind}>{error.split(':')[1]}</div>
                    ))}
            </div>  
            <input
                type='text'
                placeholder='Server Name'
                value={name}
                className='edit-server-modal-input edit-server-name-input'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                placeholder='Image URL'
                value={image_url}
                className='edit-server-modal-input edit-server-image-input'
                onChange={(e) => setImage_url(e.target.value)}
            />  
            <button className='edit-server-button'>Edit existing server</button>
        </form>
    )
}
