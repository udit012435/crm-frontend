import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaCalendarAlt, FaCogs, FaTachometerAlt, FaUsers, FaBars, FaTimes } from "react-icons/fa"

export const AdminSideBar = () => {

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
                <button className="sidebar-toggle-btn text-light" style={{marginTop: '-14px'}} onClick={toggleSidebar}>
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
                    {/* ... Your NavLink components remain here ... */}
                    <NavLink
                        to="/admin-dashboard"
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
                        to="/admin-dashboard/employees"
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar}
                    >
                        <FaUsers className="me-2" />
                        <span>Students</span>
                    </NavLink>
                    <NavLink
                        to="/admin-dashboard/departments"
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar}
                    >
                        <FaBuilding className="me-2" />
                        <span>Courses</span>
                    </NavLink>
                    <NavLink
                        to="/admin-dashboard/setting"
                        className={({ isActive }) =>
                            `nav-link text-white d-flex align-items-center mb-2 ${isActive ? 'active-click' : ''}`
                        }
                        onClick={toggleSidebar}
                    >
                        <FaCogs className="me-2" />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}