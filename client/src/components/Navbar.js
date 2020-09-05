import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(elems);
    });

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <>
        <div className="nav-wrapper blue darken-1" >
            <nav>
                <a href="/" className="brand-logo" style={{padding: '0 2rem'}}>Short urls</a>
                <a href="/" data-target="mobile-demo" className="sidenav-trigger" style={{padding: '0.5rem 0 0 0'}}><span className="material-icons">menu</span></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down" >
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </nav>
        </div>
            <ul className="sidenav sidenav-close" id="mobile-demo">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
        </>
    );
};