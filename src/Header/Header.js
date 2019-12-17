import React from 'react';
import './Header.css';
import logo from '../img/aviasalesLogo.png';

const Header = () => {
    return (
        <header className="logo">
            <img src={ logo } alt="Aviasales Logo"></img>
        </header>
    )
}

export default Header;
