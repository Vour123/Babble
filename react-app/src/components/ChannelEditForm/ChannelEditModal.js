import React, { useState } from 'react'
import { Modal } from '../context/Modal';
import ChannelEditForm from './ChannelEditForm';

export default function ChannelEditModal({setOpen}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='edit-btn-channel' onClick={() => setShowModal(!showModal)}>Edit Channel</div>
            {showModal && (
                <Modal onClose={() => setShowModal(!showModal)}>
                    <ChannelEditForm setOpen={setOpen} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
