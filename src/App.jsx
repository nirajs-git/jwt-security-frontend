import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    setAuthenticated(!!jwtToken);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: authenticated ? <Navigate to="/dashboard" /> : <Login setAuthenticated={setAuthenticated} />,
    },
    {
      path: '/register',
      element: authenticated ? <Navigate to="/dashboard" /> : <Register />,
    },
    {
      path: '/dashboard',
      element: authenticated ? <Home setAuthenticated={setAuthenticated} /> : <Navigate to="/" />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
