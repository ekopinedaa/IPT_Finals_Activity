import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminForm from './pages/AdminForm'
import StudentForm from './pages/StudentForm'
import AdminFormStud from './pages/AdminFormStud'

const Routes = createBrowserRouter([
    { path: '/', element: <LoginPage/>},
    { path: '/ManageUsers', element: <AdminForm/>},
    { path: '/StudentForm', element: <StudentForm />},
    { path: '/ManageStudents', element: <AdminFormStud/>}
])

export default Routes