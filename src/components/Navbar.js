import React from 'react';
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {api} from '../database/firebase'
import '../styles/Navbar.css'

const Navbar = () => {
    const user = useSelector(state => state.user)
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
                    <li onClick={() => {history.push("/")}}>Home</li>
                    { user ? (
                        <>
                        <li onClick={() => history.push("/mylinks")}>My links</li>
                        <li onClick={() => {api.exitAccount()}}>Sign out</li>
                        </>
                    ) : <li onClick={() => {history.push("/login")}}>Sign in</li>}
                </ul>
            </div>
        </div>
        </>
    );
}

export default Navbar;
