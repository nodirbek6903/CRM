import { createBrowserRouter } from "react-router-dom";
import App from "../components/Layout/Layouts"
import Dashboard from './../pages/Dashboard/Dashboard';
import Courses from './../pages/Courses/Courses';
import Groups from './../pages/Groups/Groups';
import Tables from '../pages/Dars Jadval/Dars_jadval';
import Students from "../pages/Students/Students";
import Attendance from './../pages/Attendance/Attendance';
import Payments from './../pages/Payments/Payments';

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


// import { createBrowserRouter } from 'react-router-dom';
// import App from '../App';
// import Dashboard from '../pages/Dashboard';
// import Courses from '../pages/Courses';
// import Groups from '../pages/Groups';
// import Tables from '../pages/Dans_jadvali';
// import Students from '../pages/Students';
// import Attendance from '../pages/Attendance';
// import Payments from '../pages/Payments';
// import Login from '../pages/Login'; // Login sahifasini qo'shing
// import ProtectedRoute from '../components/ProtectedRoute'; // ProtectedRoute komponentini import qiling

// // Foydalanuvchi autentifikatsiyasi (buni Redux, Context API yoki boshqa manbadan olingan holat bilan boshqarishingiz mumkin)
// const isAuthenticated = false; // Bu yerda autentifikatsiyani tekshiradigan haqiqiy holatni ishlating

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/login',
//         element: <Login />, // Login sahifasi ochiq
//       },
//       {
//         path: '/',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Dashboard />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/courses',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Courses />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/groups',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Groups />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/tables',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Tables />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/students',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Students />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/attendance',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Attendance />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: '/payments',
//         element: (
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Payments />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
// ]);

// export default router;
