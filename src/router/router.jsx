import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from './../pages/Dashboard';
import Courses from './../pages/Courses';
import Groups from './../pages/Groups';
import Tables from '../pages/Dars_jadval';
import Students from "../pages/Students";
import Attendance from './../pages/Attendance';
import Payments from './../pages/Payments';

const router = createBrowserRouter ([
    {
        path:'/',
        element: <App />, 
        children: [
            {
                path:"/",
                element: <Dashboard/>
            },
            {
                path:"/courses",
                element: <Courses/>
            },
            {
                path:"/groups",
                element: <Groups/>
            },
            {
                path:"/tables",
                element: <Tables/>
            },
            {
                path:"/students",
                element: <Students/>
            },
            {
                path:"/attendance",
                element: <Attendance/>
            },
            {
                path:"/payments",
                element: <Payments/>
            }
        ]
    }
])
export default router;