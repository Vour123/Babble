import React, { useState } from 'react'

export default function ServerEditForm() {
    const [name, setName] = useState('')
    const [image_url, setImage_url] = useState('')
    const [priv, setPriv] = useState(false)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) =>{ 
        e.preventDefault()
        // const serverInformation = {
        //     name,
        //     image_url,
        //     priv,
        //     owner_id
        // }
        // const data = await dispatch(addServer(serverInformation))
        // if(data.errors) {
        //     setErrors(data.errors)
        // } else {
        //     history.push(`/servers/${data.id}`)
        // }
    }

    return (
        <form className='server-edit-container' onSubmit={handleSubmit}>
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
