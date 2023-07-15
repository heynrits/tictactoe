import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.jsx'
import InGame from './pages/InGame.jsx'

import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_PATH || 'http://localhost:3000'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/play',
    element: <InGame />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
