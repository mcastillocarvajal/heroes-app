import React from 'react'

export const LoginScreen = ({ history }) => {

    const handleLogin = () => {
        history.replace('/')
    }

    return (
        <div className="container mt-5">
            <h1> Login Screen</h1>
            <hr/>

            <button
                className="btn btn-dark"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
