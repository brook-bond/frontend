import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import Addproduct from './pages/Addproduct';
import Productlist from './pages/Productlist';
import EditProduct from './pages/EditProduct';
import ViewProduct from './pages/ViewProduct';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/addproduct',
				element: <Addproduct />,
			},
			{
				path: '/productlist',
				element: <Productlist />,
			},
			{
				path: '/editproduct/:id/edit',
				element: <EditProduct />,
			},
			{
				path: '/view/:id/view',
				element: <ViewProduct />,
			}
		],
	},
]);

export default router;