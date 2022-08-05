import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

export default function NavBar(props) {
    let navBackgroundColor = props.mode;
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';
    const navigate = useNavigate();
    var NavMenu = '';

    const logOut = (e) => {
        e.preventDefault();

        axios.post('/logout').then(function (response) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            swal({
                title: "Success!!",
                text: "User Logged Out Successfully",
                icon: "success",
            });
            navigate('/');
        }).catch(function (error) {
            swal(error.response.data.message);
        });
    }


    if (localStorage.getItem('auth_token')) {
        NavMenu = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/papers">Papers</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logOut}>Logout</Link>
                </li>
            </>
        )
    } else {
        NavMenu = (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </>
        )
    }

    return (
        <header>
            <nav className={`navbar navbar-expand-md navbar-${navBackgroundColor} fixed-top`}>
                <div className="container">
                    <Link className="navbar-brand" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            {NavMenu}
                        </ul>
                        <form className="d-flex" role="search">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                                <label className={`form-check-label ${navFontColor}`} htmlFor="flexSwitchCheckDefault">
                                    Enable {props.mode === 'light' ? 'Dark' : 'Light'} Mode
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

// Defining the data type acpecting as a prop
NavBar.propTypes = {
    title: PropTypes.string.isRequired,
}

// Seting the default cvalue for the prop if not coming
NavBar.defaultProps = {
    title: 'Set Title',
}
