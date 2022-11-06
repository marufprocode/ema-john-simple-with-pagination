import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const {user, signOutUser} = useContext(AuthContext);
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid?
                    <Link to="/login" onClick={signOutUser}>Log Out</Link>:
                    <>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                    </>
                }
                <span className='user-text'>{user?.email}</span>
            </div>
        </nav>
    );
};

export default Header;