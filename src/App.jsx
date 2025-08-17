import './App.css'
import {Routes, Route , Navigate} from 'react-router-dom'
import {Login} from './pages/Login'
import  AdminDashboard  from './pages/AdminDashboard'
import { EmployeeDashboard } from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'; 
import { AdminSummary } from './components/dashboard/AdminSummary'
import { DepartmentList } from './components/dashboard/departments/DepartmentList'
import { AddDepartment } from './components/dashboard/departments/AddDepartment'
import EditDepartment from './components/dashboard/departments/EditDepartment'
import List from './components/employees/List'
import AddEmployee from './components/employees/AddEmployee'
import View from './components/employees/View'
import Edit from './components/employees/Edit'
import { Summery } from './components/EmployeeDashboard/Summery'
import Table from './components/Leaves/Table'
import LeaveList from './components/Leaves/LeaveList'
import AddLeave from './components/Leaves/AddLeave'
import Setting from './components/EmployeeDashboard/Setting'
import Detail from './components/Leaves/Detail'
// import Profile from './components/EmployeeDashboard/Profile'





function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Navigate to='/admin-dashboard' />}></Route>
        <Route exact path='/login' element={<Login />}></Route> 
        <Route exact path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
            <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
            <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>

            <Route path='/admin-dashboard/employees' element={<List />}></Route>
            <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
            <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />}></Route>
            <Route path='/admin-dashboard/add-employee' element={<AddEmployee />}></Route>
            <Route path='/admin-dashboard/setting' element={<Setting />}></Route>

            <Route path='/admin-dashboard/leaves' element={<Table />}></Route>
            <Route path='/admin-dashboard/leaves/:id' element={<Detail />}></Route>
            <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />}></Route>
            
          </Route>
        <Route exact path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          }>
          <Route index element={<Summery />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<View/>}></Route>
          {/* <Route path='/employee-dashboard/leaves' element={<LeaveList/>}></Route> */}
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList/>}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave/>}></Route>
          <Route path='/employee-dashboard/setting' element={<Setting/>}></Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
