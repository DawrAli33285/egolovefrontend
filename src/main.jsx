import './i18n/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import Layout            from './components/Layout'
import HomePage          from './pages/HomePage'
import LoginPage         from './pages/LoginPage'
import RegisterPage      from './pages/RegisterPage'
import OnboardPage       from './pages/OnboardPage'
import FreeQuizPage      from './pages/FreeQuizPage'
import FreeResultsPage   from './pages/FreeResultsPage'
import PremiumQuizPage   from './pages/PremiumQuizPage'
import PremiumReportPage from './pages/PremiumReportPage'
import ProfilePage       from './pages/ProfilePage'
import SubscriptionPage  from './pages/SubscriptionPage'

import './index.css'
import ScrollToTop from './middleware/scroll.jsx'
import ProtectedRoute from './middleware/auth.jsx'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51SRynCPBwgTANTk6OM3ADMEkOYuyTGcfBfz92xAXVsLmm8O6tH7dCVgcwhG4rmi5OH3URGSa6faVFD2WYbI7E8oA00drLGc9l6');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Elements stripe={stripePromise}><ScrollToTop /><Layout /></Elements>,
    children: [
      { index: true,            element: <HomePage /> },
      { path: 'login',          element: <LoginPage /> },
      { path: 'register',       element: <RegisterPage /> },
      { path: 'onboard',        element: <ProtectedRoute><OnboardPage /></ProtectedRoute> },
      { path: 'quiz',           element: <ProtectedRoute><FreeQuizPage /></ProtectedRoute> },
      { path: 'results',        element: <ProtectedRoute><FreeResultsPage /></ProtectedRoute> },
      { path: 'premium-quiz',   element: <ProtectedRoute><PremiumQuizPage /></ProtectedRoute> },
      { path: 'premium-report', element: <ProtectedRoute><PremiumReportPage /></ProtectedRoute> },
      { path: 'profile',        element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: 'subscription',   element: <SubscriptionPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
)
