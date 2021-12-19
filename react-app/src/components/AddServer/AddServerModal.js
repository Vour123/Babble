import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal'
import { useHistory } from 'react-router-dom';
import AddServerForm from './AddServerForm';

export default function AddServerModal() {
    const [showModal, setShowModal] = useState(false)
    const history = useHistory();

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddServerForm />
                </Modal>
            )}
        </>
    )
}
