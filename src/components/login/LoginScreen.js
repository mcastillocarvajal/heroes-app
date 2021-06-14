import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext( AuthContext );

    const handleLogin = () => {

        const lastPath = localStorage.getItem('lastPath') || '/';
        const searchPath = localStorage.getItem('searchPath')

        dispatch({
            type: types.login,
            payload: {
                name: 'Moises'
            }
        })

        history.replace( 
            ( searchPath )
                ? lastPath + searchPath
                : lastPath
         )
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
