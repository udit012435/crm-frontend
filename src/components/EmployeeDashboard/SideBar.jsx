import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCogs, FaTachometerAlt, FaUser,  FaBars, FaTimes } from "react-icons/fa"
import { useAuth } from '../../context/authContext'


const SideBar = () => {
    const { user } = useAuth()
    // 1. State to manage sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 2. Function to toggle the sidebar state
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            {/* 3. Hamburger Toggle Button */}
            <div className="toggleButton">
                <button className="sidebar-toggle-btn text-light" style={{ marginTop: '-14px' }} onClick={toggleSidebar}>
                    {/* Show FaTimes when open, FaBars when closed */}
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            {/* 4. Sidebar Container - apply dynamic class based on state */}
            <div
                id="sideBar"
                className={isSidebarOpen ? 'open' : 'closed'}
            >
                {/* Sidebar Header */}
                <div className="mx-3 mb-4">
                    <h3 className="text-center">C R M</h3>
                    <hr />
                </div>

                {/* Sidebar Links */}
                <div className="nav flex-column">
                    <NavLink
                        to="/employee-dashboard"
                        end
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar} // Optional: Close sidebar on link click
                    >
                        <FaTachometerAlt className="me-2" />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to={`/employee-dashboard/profile/${user._id}`}
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar} // Optional: Close sidebar on link click
                    >
                        <FaUser className="me-2" />
                        <span>My Profile</span>
                    </NavLink>

                    <NavLink
                        to={`/employee-dashboard/leaves/${user._id}`}
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar} // Optional: Close sidebar on link click
                    >
                        <FaBuilding className="me-2" />
                        <span>Leaves</span>
                    </NavLink>

                    <NavLink
                        to="/employee-dashboard/setting"
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar} // Optional: Close sidebar on link click
                    >
                        <FaCogs className="me-2" />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </>

    )
}

export default SideBar