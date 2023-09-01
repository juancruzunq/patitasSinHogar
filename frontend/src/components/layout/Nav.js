import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/components/layout/nav.css';

const Nav = (props) => {
    return (
        <div className="nav-container">
        <nav>
            <div className="nav-items">
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/publicar">Publicar Patita</NavLink></li>   
                    <li><NavLink to="/adoptar">Adoptar Patita</NavLink></li>                                  
                    <li><NavLink to="/publicadas">Mis Patitas Publicadas</NavLink></li>
                </ul>
            </div>
        </nav>
        </div>
    );
}

export default Nav;