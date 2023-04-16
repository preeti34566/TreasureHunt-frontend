import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Route,
  Redirect,
  RouterProvider,
  Navigate,
  Routes,
} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Game from './components/Game';
import Navbar from './components/Navbar';
import Account from './components/Account';
import Statistics from './components/Statistics';
import LeaderBoard from './components/LeaderBoard';
import Admin from './components/Admin';
import { AuthContext, AuthProvider } from './AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      {
        path: '/home',
        element: (
          <>
            <Navbar />
            <Home />
          </>
        ),
        children: [
          { index: true },
          {
            path: '/home/game',
            element: <Game />
          },
          {
            path: '/home/account',
            element: <Account />
          },
          {
            path: '/home/statistics',
            element: <Statistics />
          },
          {
            path: '/home/leaderboard',
            element: <LeaderBoard />
          },
          {
            path: '/home/admin',
            element: <Admin />
          },
        ]
      }
    ]
  },
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();




