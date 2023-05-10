import React, {useRef} from 'react'

function AppLogIn() {
    const inputUsername = useRef<HTMLInputElement>(null)
    const inputEmail = useRef<HTMLInputElement>(null)
    const inputPassword = useRef<HTMLInputElement>(null)
    function registerData(e:React.FormEvent){
        e.preventDefault()
        const userName = inputUsername.current?.value
        const passWord = inputEmail.current?.value
        const eMail = inputPassword.current?.value
        console.log(`${userName} ${eMail} ${passWord}`)
    }

    return (
    <>
        <form onSubmit={registerData}>
            <label>USERNAME</label>
            <input type='input' placeholder='Your Username' ref = {inputUsername}/>
            <label>E-mail</label>
            <input type='email' placeholder='Your Email address' ref = {inputEmail}/>
            <label>Password</label>
            <input type='password' placeholder='Your Password' ref = {inputPassword}/>
            <button type ='submit'>Register</button>
        </form>
    </> );
}

export default AppLogIn;