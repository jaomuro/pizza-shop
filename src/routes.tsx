import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './pages/app/dashboard'
import { Signin } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/sign-in',
    element: <Signin />,
  },
])
