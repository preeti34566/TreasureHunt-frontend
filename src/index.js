import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
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
  // {
  //   path:'/home/game',
  //   element:  <Game />,
  // }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
