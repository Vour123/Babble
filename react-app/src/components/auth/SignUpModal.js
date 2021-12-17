import React, { useState } from 'react';
import { Modal } from '../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="nav-btn" onClick={() => setShowModal(true)}>Sign Up</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm/>
                </Modal>
            )}
        </>
    )
}

export default SignUpModal