import Home from './pages/Home';
import About from './pages/About';
import MainLayout from './layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import NotFound from './pages/NotFound';

const routes = [
    {
        path: '/',
        element: <MainLayout >
            <Outlet />
        </MainLayout>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];

export default routes;