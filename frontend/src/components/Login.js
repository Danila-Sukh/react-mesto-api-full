import React, { useState } from "react";
import AuthPage from "./AuthPage";

export default function Login({ onAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e) {
        const {value} = e.target
        e.target.name === 'Email' ? setEmail(value) : setPassword(value)
      }
    
      function handleSubmit(e) {
        e.preventDefault()
        onAuth(password, email)
      }
    
      return (
        <div className='login'>
        <AuthPage
          formName='login'
          onSubmit={handleSubmit}
          title='Вход'
          buttonText='Войти'
        >
           <input
          name="Email"
          type="email"
          className="popup__input_type_login"
          id="email"
          placeholder="Email"
          value={email || ''}
          onChange={handleChange}
        />
       
        <input
          name="Password"
          type="password"
          className="popup__input_type_login"
          id="password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handleChange}
        />
       
      </AuthPage>
    </div> 
      )
}