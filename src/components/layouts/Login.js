import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Login(props) {
    document.title = 'MCQ APP | LOGIN';
    let navBackgroundColor = props.mode === 'light' ? 'bg-light' : 'bg-dark';
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';
    let border = props.mode === 'light' ? 'border-dark' : 'border-light';
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState([]);

    const navigate = useNavigate();


    const submitLoginForm = e => {
        e.preventDefault();

        axios.post('/login', {
            email: email,
            password: password,
        })
            .then(function (response) {
                setError([]);
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('auth_user', response.data.user.name);
                swal({
                    title: "Success!!",
                    text: "User Login Successfully",
                    icon: "success",
                });
                navigate('/dashboard');
            })
            .catch(function (errorData) {
                if (errorData.response.data === undefined) {
                    setError({ status: false, message: 'Backend API is not responding.' });
                } else {
                    setError(errorData.response.data);
                }
            });
    }

    return (
        <div id="layoutAuthentication" className={`py-4 my-4`}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className={`card shadow-lg border-0 rounded-lg mt-5 ${navBackgroundColor}  ${navFontColor} ${border} `} >
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                        <div className="mb-3">
                                            <input className="form-control" id="inputEmail" type="email" onChange={e => setEmail(e.target.value)} />
                                            <span className="text-danger badge">{error.email}</span>
                                        </div>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                        <div className="mb-3">
                                            <input className="form-control" id="inputPassword" type="password" onChange={e => setPassword(e.target.value)} />
                                            <span className="text-danger badge">{error.password}</span>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                            <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                        </div>
                                        <span className="text-danger badge">{error.message}</span>
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <Link className="small" to="/login">Forgot Password?</Link>
                                            <a className="btn btn-primary" href="/" onClick={submitLoginForm}>Login</a>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
