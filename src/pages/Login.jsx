import React, { useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useAuth()
    const [showAdminPassword, setShowAdminPassword] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    //    const {user} = useContext(userContext)
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            // console.log(response)
            if(response.data.success){
                // alert("Successfully login")
                login(response.data.user)
                
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                } else{
                    navigate('/employee-dashboard')
                }
            }
        } catch(error){
            // console.log(error)
            if(error.response && !error.response.data.success){
                setError(error.response.data.error || "Invalid credentials")
            } else{
                setError("Server Error") 
            }
        }
    }

    return(
        <div style={{height:"300px", background:"linear-gradient(to top , rgb(0, 133, 133), rgb(0, 46, 46))", color:"white"}}>
            <div className="text-center pt-3">
                <h1 className="">C R M</h1>
            </div>
            <div className="container d-flex justify-content-center alin-item-center mt-4">
                <div className="card shadow" style={{ width: "35%", padding:"30px 30px" }}>
                <form onSubmit={handleSubmit} className="">
                    <h2>Login</h2>
                      <hr id="loginHr"/>
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            {error && <p className="text-danger">{error}</p>}
                            <input type="email" className="form-control" id="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type={showAdminPassword ? "text" : "password"}  className="form-control" id="password" placeholder="******" onChange={(e) => setPassword(e.target.value)}  required />
                            <span
                            onClick={() => setShowAdminPassword(prev => !prev)}
                            style={{
                                position: "absolute",
                                top: "38px",
                                right: "10px",
                                cursor: "pointer",
                                color: "#6c757d"
                            }}
                        >
                            {showAdminPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                        </span>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <label htmlFor="checkbox"><input type="checkbox" /><span id="checkbox"> Remember me</span></label>
                            </div>
                            <div className="col-md-6 text-end">
                                <a href="#" style={{textDecoration:"none"}}>Forgot Password?</a>
                            </div>
                        </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};