import { createBrowserRouter } from 'react-router'
import Home from './features/college/pages/Home'
import CollegeDetail from './features/college/pages/Details'
import CompareColleges from './features/college/pages/Compare'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/college/:id",
        element: <CollegeDetail />
    },
    {
        path: "/compare",
        element: <CompareColleges />
    }
])