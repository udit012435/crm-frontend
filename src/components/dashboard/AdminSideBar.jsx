import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers, FaSignOutAlt } from "react-icons/fa"

export const AdminSideBar = () => {
    return (
        <div id="sideBar" className="d-flex flex-column bg-dark text-white vh-100 p-3" >
            {/* Sidebar Header */}
            <div className="  mx-3 mb-4">
                <h3 className=" text-center">C R M</h3>
                <hr />
            </div>

            {/* Sidebar Links */}
            <div className="nav flex-column">
                <NavLink
                    to="/admin-dashboard"
                    end
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                // activeClassName="active"
                >
                    <FaTachometerAlt className="me-2" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin-dashboard/employees"
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                // activeClassName="active"
                >
                    <FaUsers className="me-2" />
                    <span>Employees</span>
                </NavLink>
                <NavLink
                    to="/admin-dashboard/departments"
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                // activeClassName="active"
                >
                    <FaBuilding className="me-2" />
                    <span>Department</span>
                </NavLink>
                <NavLink
                    to="/admin-dashboard/leaves"
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                // activeClassName="active"
                >
                    <FaCalendarAlt className="me-2" />
                    <span>Leaves</span>
                </NavLink>

                <NavLink
                    to="/admin-dashboard/setting"
                    className={({ isActive }) =>
                        `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                    }
                // activeClassName="active"
                >
                    <FaCogs className="me-2" />
                    <span>Settings</span>
                </NavLink>

            </div>
        </div>
    )
}