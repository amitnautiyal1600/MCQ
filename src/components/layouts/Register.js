import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Register(props) {
    document.title = 'MCQ APP |  REGISTER';
    let navBackgroundColor = props.mode === 'light' ? 'bg-light' : 'bg-dark';
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';
    let border = props.mode === 'light' ? 'border-dark' : 'border-light';

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const SubmitRegisterForm = e => {
        e.preventDefault();

        axios.post('/register', {
            name: name,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
            .then(function (response) {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('auth_user', response.data.user.name);
                setError([]);
                swal({
                    title: "Success!!",
                    text: "User regiser Successfully",
                    icon: "success",
                });
                navigate('/dashboard');
            })
            .catch(function (errorData) {
                console.log(errorData)
                if (errorData.response.data === undefined) {
                    setError({ status: false, message: 'Backend API is not responding.' });
                } else {
                    setError(errorData.response.data.errors);
                }
            });
    }

    return (
        <div id="layoutAuthentication" className={`py-4 my-4`}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className={`card shadow-lg border-0 rounded-lg mt-5 ${navBackgroundColor}  ${navFontColor} ${border} `}>
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className=" mb-3 mb-md-0">
                                                        <label htmlFor="inputFirstName">Name</label>
                                                        <input className="form-control" id="name" type="text" onChange={e => { setName(e.target.value) }} />
                                                        <span className="text-danger badge">{error.name}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="">
                                                        <label htmlFor="inputLastName">Phone</label>
                                                        <input className="form-control" id="inputPhone" type="text" onChange={e => { setPhone(e.target.value) }} />
                                                        <span className="text-danger badge">{error.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" mb-3">
                                                <label htmlFor="inputEmail">Email address</label>
                                                <input className="form-control" id="inputEmail" type="email" onChange={e => { setEmail(e.target.value) }} />
                                                <span className="text-danger badge">{error.email}</span>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className=" mb-3 mb-md-0">
                                                        <label htmlFor="inputPassword">Password</label>
                                                        <input className="form-control" id="inputPassword" type="password" onChange={e => { setPassword(e.target.value) }} />
                                                        <span className="text-danger badge">{error.password}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className=" mb-3 mb-md-0">
                                                        <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                                        <input className="form-control" id="inputPasswordConfirm" type="password" onChange={e => { setConfirmPassword(e.target.value) }} />
                                                        <span className="text-danger badge">{error.confirmPassword}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-danger badge">{error.message}</span>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid"><Link className="btn btn-primary btn-block" to="/" onClick={SubmitRegisterForm}>Create Account</Link></div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </div >
    )
}
