import React, { useState } from 'react'
import { Modal } from '../context/Modal'
import AddChannelForm from './AddChannelForm'
import './AddChannel.css'

export default function AddChannelModal() {
    const [showModal, setShowModal] = useState(false)
    
    
    return (
        <>
            <div className='add-channel-button'>
                <span onClick={() => setShowModal(true)} class="material-icons-outlined add-channel-svg">add</span>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddChannelForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
