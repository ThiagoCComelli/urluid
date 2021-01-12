import React from 'react';
import {useHistory} from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
    const history = useHistory()

    return (
        <>
        <div className="mainNavbar">
            <div className="mainNavbarBox">
                <div onClick={() => {history.push("/")}} className="mainNavbarTitle">
                    <h5>urluid</h5>
                    <span>.tk</span>
                </div>
                <ul>
                    <li>Home</li>
                    <li>Sign in</li>
                </ul>
            </div>
        </div>
        </>
    );
}

export default Navbar;
