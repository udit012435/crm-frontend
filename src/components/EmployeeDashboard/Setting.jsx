import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
// import { BASE_URL } from '../../config';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    }

    const handleSubmit = async (e) => {
        //    const {user} = useContext(userContext)
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched")
        } else {
            try {
                const response = await axios.put(`https://crm-server-4.onrender.com/api/setting/change-password`, setting,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                // console.log(response)
                if (response.data.success) {
                    navigate("/login")
                    setError("")
                }
            } catch (error) {
                // console.log(error)
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error || "Invalid password")
                } else {
                    setError("Server Error")
                }
            }
        }
    }

    return (
        <div className="container-fluid" id="fullContainer">
            <div className="card shadow" style={{ width: "40%" }} id="loginBox">
                <h3 className="text-center mb-4 mt-3">Change Password</h3>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3" style={{ position: "relative" }}>
                        <label htmlFor="email" className="form-label">Password</label>
                        {error && <p className="text-danger">{error}</p>}
                        <input type={showOldPassword ? "text" : "password"} className="form-control" name='oldPassword' placeholder="******" onChange={handleChange} required />
                        <span
                            onClick={() => setShowOldPassword(prev => !prev)}
                            style={{
                                position: "absolute",
                                top: "38px",
                                right: "10px",
                                cursor: "pointer",
                                color: "#6c757d"
                            }}
                        >
                            {showOldPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                        </span>
                    </div>
                    <div className="mb-3" style={{position:'relative'}}>
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input className="form-control" type={showNewPassword ? "text" : "password"} name='newPassword' placeholder="******" onChange={handleChange} required />
                        <span
                            onClick={() => setShowNewPassword(prev => !prev)}
                           style={{
                                position: "absolute",
                                top: "38px",
                                right: "10px",
                                cursor: "pointer",
                                color: "#6c757d"
                            }}
                        >
                            {showNewPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                        </span>
                    </div>
                    <div className="mb-3" style={{ position: 'relative' }}>
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            name="confirmPassword"
                            placeholder="******"
                            onChange={handleChange}
                            required
                        />
                        <span
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            style={{
                                position: "absolute",
                                top: "38px",
                                right: "10px",
                                cursor: "pointer",
                                color: "#6c757d"
                            }}
                        >
                            {showConfirmPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                        </span>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6">
                            <label htmlFor="checkbox"><input type="checkbox" /><span id="checkbox"> Remember me</span></label>
                        </div>
                        <div className="col-md-6 text-end">
                            <a href="#" style={{ textDecoration: "none" }}>Forgot Password?</a>
                        </div>
                    </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-primary">change password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Setting;