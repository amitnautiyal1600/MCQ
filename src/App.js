import './App.css';

import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/layouts/Home';
import Login from './components/layouts/Login';
import Register from './components/layouts/Register';
import NavBar from './components/parts/NavBar';
import Footer from './components/parts/Footer';
import Dashboard from './components/layouts/admin/Dashboard';
import axios from 'axios';
import PrivateRoute from './routes/PrivateRoute';
import Papers from './components/layouts/admin/Papers';
import Questions from './components/layouts/admin/Questions';

function App() {


  var oldMode = localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light';
  const [mode, setMode] = useState(oldMode);

  axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
  axios.defaults.headers.post['Contacnt-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';

  //axios.defaults.withCredentials = true;
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  })

  const toggleMode = () => {
    if (mode === 'light') {
      localStorage.setItem('mode', 'dark');
      setMode('dark');
      document.body.classList.remove('bg-light', 'text-dark');
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      localStorage.setItem('mode', 'light');
      setMode('light');
      document.body.classList.remove('bg-dark', 'text-light');
      document.body.classList.add('bg-light', 'text-dark');
    }
  }

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.remove('bg-light', 'text-dark');
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
      document.body.classList.add('bg-light', 'text-dark');
    }
  });

  return (
    <BrowserRouter>
      <NavBar title="VIDHIKARA" mode={mode} toggleMode={toggleMode} />
      <div id="main" className='container clear-top'>
        <Routes>
          <Route path="/" element={<Home mode={mode} />} />

          <Route path="/login" element={<Login mode={mode} />} />
          <Route path="/register" element={<Register mode={mode} />} />

          <Route path="/dashboard" element={<PrivateRoute mode={mode} Component={Dashboard} />} />
          <Route path="/papers" element={<PrivateRoute mode={mode} Component={Papers} />} />
          <Route path="/questions/:paper_id" element={<PrivateRoute mode={mode} Component={Questions} />} />
        </Routes>
      </div>
      <Footer mode={mode} />
    </BrowserRouter>
  );
}

export default App;
