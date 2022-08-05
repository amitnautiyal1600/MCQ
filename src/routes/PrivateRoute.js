import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function PrivateRoute(props) {

    const { Component, mode } = props;
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/check-login')
            .then(function (response) {
                setLoggedIn(true);
            })
            .catch(function (error) {
                swal({
                    title: "Not Authenticated!!",
                    text: "Please login to visit this route.",
                    icon: "error",
                });
                localStorage.clear();
                setLoggedIn(false);
                navigate('/login');
            });
    });

    if (!isLoggedIn) {
        <div>loading...</div>
    } else {
        return (
            <div>
                <Component mode={mode} />
            </div>
        )
    }
}
