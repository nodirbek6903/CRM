import { createBrowserRouter } from "react-router-dom";
import App from "../components/Layout/Layouts"
import Dashboard from './../pages/Dashboard/Dashboard';
import Courses from './../pages/Courses/Courses';
import Groups from './../pages/Groups/Groups';
import Tables from '../pages/Dars Jadval/Dars_jadval';
import Student from "../pages/Students/Students";
import Attendance from './../pages/Attendance/Attendance';
import Payments from './../pages/Payments/Payments';
import Login from "../auth/Login"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter ([
    {
        path:'/',
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: [
            {
                path:"/",
                element: <ProtectedRoute><Dashboard/></ProtectedRoute>
            },
            {
                path:"/courses",
                element: <ProtectedRoute><Courses/></ProtectedRoute>
            },
            {
                path:"/groups",
                element: <ProtectedRoute><Groups/></ProtectedRoute>
            },
            {
                path:"/tables",
                element: <ProtectedRoute><Tables/></ProtectedRoute>
            },
            {
                path:"/students",
                element: <ProtectedRoute><Student/></ProtectedRoute>
            },
            {
                path:"/attendance",
                element: <ProtectedRoute><Attendance/></ProtectedRoute>
            },
            {
                path:"/payments",
                element: <ProtectedRoute><Payments/></ProtectedRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])
export default router;

