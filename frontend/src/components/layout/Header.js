import React from 'react';
import '../../styles/components/layout/header.css'
import LogOut from "./LogOut";


const Header = () => {


    return (

        <header>
            <div className="header-container">
                <div className="header-tittle">
                    <h1>PatitasSinHogar </h1>
                </div>
                <LogOut/>
            </div>
        </header>

    );
}

export default Header;