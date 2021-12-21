import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';

export default function DropDownServer() {
    const [open, SetOpen] = useState(false)
    return (
        <div>
            <li className='nav-item'>
                <span onClick={() => SetOpen(!open)}class="material-icons-outlined">arrow_drop_down</span>
            </li>
            <div className='actual-box'>
                {open && <DropDownMenu/>}
            </div>
        </div>

    )
}

function DropDownMenu() {
    const [activeMenu, setActiveMenu] = useState('main') 

    function DropDownItem(props) {
        return(
            <a href='#' className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className='icon-button'>{props.leftIcon}</span>
                {props.children}
                <span className='icon-right'>{props.rightIcon}</span>
            </a>
        )    
    }

    return (
        <div className='drop-down'>
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames='menu-primary'>

                <div className='menu'>
                    <DropDownItem 
                        leftIcon={<span className="material-icons-outlined">edit</span>}
                        goToMenu='edit'>
                        Edit Server</DropDownItem>
                    <DropDownItem leftIcon={<span className="material-icons-outlined trash">delete</span>}> Delete Server</DropDownItem>
                </div>
            </CSSTransition>

            <CSSTransition in={activeMenu === 'edit'} unmountOnExit timeout={500} classNames='menu-secondary'>

                <div className='menu'>
                    <DropDownItem goToMenu='main' leftIcon={<span className="material-icons-outlined">arrow_back</span>}></DropDownItem>
                    <DropDownItem>
                        {/* put the form here */}
                    </DropDownItem>
                </div>
            </CSSTransition>
        </div>
    )
}
