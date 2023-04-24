import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import "./Header.css";
import {AuthContext} from "../../providers/AuthProviders.jsx";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    
    const handleLogOut = () => {
        logOut()
            .then( () => {})
            .catch(error => {
                console.error(error);
            });
    }
    
    return (
        <div>
            <div className="navbar bg-primary text-primary-content">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                <Link className="btn btn-ghost normal-case text-xl" to="/">Home</Link>
                <Link className="btn btn-ghost normal-case text-xl" to="/login">Login</Link>
                <Link className="btn btn-ghost normal-case text-xl" to="/register">Register</Link>
                {
                    user ? <>
                        <span className="mr-4">{user.email}</span>
                        <button onClick={handleLogOut} className="btn btn-xs">Log out</button>
                    </> : <Link to="/login">Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;