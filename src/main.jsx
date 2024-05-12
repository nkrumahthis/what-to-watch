import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './routes/root.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Results from './Results.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h1>404</h1>,
    children : [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/results",
        element: <Results />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
