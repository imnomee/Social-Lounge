import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const App = () => {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
    ]);
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
