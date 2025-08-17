import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from '../../context/authContext'


const SideBar = () => {
    const { user } = useAuth()
    return (
        <div id="sideBar" className="d-flex flex-column bg-dark text-white vh-100 p-3">
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
                >
                    <FaTachometerAlt className="me-2" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashboard/profile/${user._id}`}
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                >
                    <FaUser className="me-2" />
                    <span>My Profile</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashboard/leaves/${user._id}`}
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                >
                    <FaBuilding className="me-2" />
                    <span>Leaves</span>
                </NavLink>

                <NavLink
                    to="/employee-dashboard/setting"
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                >
                    <FaCogs className="me-2" />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>

    )
}

export default SideBar