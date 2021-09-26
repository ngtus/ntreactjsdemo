import { useState } from "react/cjs/react.development";
import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";


const validateEmail = (email) => {
    if (!email) return 'Required!';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) return 'Invalid email.';
}
const validatePassword = (password) => {
    if (!password) return 'Required!';
    if (password.length < 8) return 'Password must be more than 8 chars.'
}
const LoginPage = (props) => {
    const history = useHistory()
    const currentUser = useContext(UserContext)
    if (currentUser.authed) history.push(`/profile`);
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })

    const handleOnBlur = evt => {
        const name = evt.target.name
        setTouched({ ...touched, [name]: true })
    }
    const handleLogin = (evt) => {
        evt.preventDefault()
        props.handleLogin(values.email, values.password);
    }
    const handleOnchange = evt => {
        const name = evt.target.name
        setValues({ ...values, [name]: evt.target.value })
    }
    const emailError = validateEmail(values.email)
    const passwordError = validatePassword(values.password)

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="text" name="email" placeholder="email" value={values.email} onChange={handleOnchange} onBlur={handleOnBlur} />
                {touched.email && emailError && <div>{emailError}</div>}
                <input type="password" name="password" placeholder="password" value={values.password} onChange={handleOnchange} onBlur={handleOnBlur} />
                {touched.password && passwordError && <div>{passwordError}</div>}
                <input type="submit" value="Login" onClick={handleLogin} />
            </form>
        </div>

    )
}

export default LoginPage;