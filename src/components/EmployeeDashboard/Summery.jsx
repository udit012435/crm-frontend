import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export const Summery = () => {
    const {user} = useAuth()
    return (
        <>
        <div id="summeryEmp" className="container d-flex ms-5" >
            <div style={{ fontSize: '3rem', color:'rgb(152, 185, 137)',background:"white", border:"2px solid green", padding:"5px 20px", borderRadius:"100px"}}>
               <FaUser/>
            </div>
            <div className="ps-3 py-1">
                <h4 >Welcome Back</h4>
                <h2 className="fw-bold">{user.name.toUpperCase()}</h2>
            </div>
        </div>
            <div className="slide">
                <div className="slide-box">
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    {/* <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1>
                    <h1>HELLO {user.name}</h1> */}
                </div>
            </div>
        </>

    );
};