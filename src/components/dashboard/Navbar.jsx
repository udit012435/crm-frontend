import React from "react";
import { useAuth } from "../../context/authContext";
import {FaSignOutAlt} from "react-icons/fa"


export const Navbar = () => {
    const {user, logout} = useAuth()
    return (
        <div className="container-fluid mb-3" id="Navbar">
            <div className="row">
                <div className="col-md-6">
                    <p className="pt-3" style={{fontWeight:"600"}}>Welcome {user.name.toUpperCase()}</p>
                </div>
                <div className="col-md-6 text-end" id="logOut">
                    <button  id="logout" title="Logout" className="me-2" onClick={logout}><FaSignOutAlt style={{marginBottom:"4px"}}/></button>
                </div>
            </div>
        </div>
        

    );
};