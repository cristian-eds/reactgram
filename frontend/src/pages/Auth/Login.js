import './Auth.css'

// components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// redux

import React from 'react'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='E-mail' value={email || ""} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Senha' value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Entrar" />
      </form>
      <p>Não tem uma conta? <Link to="/register">Clique aqui</Link> </p>
    </div>
  )
}

export default Login