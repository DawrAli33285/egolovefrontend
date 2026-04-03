import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../baseurl';

const AppContext = createContext(null);

export function AppProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })
  const [subscribed, setSubscribed] = useState(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return false
    try { return JSON.parse(stored)?.isPremium || false } catch { return false }
  });
  const [plan, setPlan] = useState(null);


 
  const [freeResults, setFreeResults]       = useState(null); 
  const [premiumResults, setPremiumResults] = useState(null); 



  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (!token) return
  
    axios.get(`${BASE_URL}/users/getUser`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      const freshUser = { ...data.user, token }
      setUser(freshUser)
      setSubscribed(freshUser.isPremium || false)
      localStorage.setItem('user', JSON.stringify(freshUser))
    }).catch((err) => {
      console.log('getUser failed:', err.response?.status, err.message)
      console.log(err.message)
    
    })
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    if (userData.token) localStorage.setItem('token', userData.token)
  }

 
const logout = () => {
  setUser(null)
  setSubscribed(false)
  setPlan(null)
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const register = (userData) => {
  setUser(userData)
  localStorage.setItem('user', JSON.stringify(userData))
  if (userData.token) localStorage.setItem('token', userData.token)
}

  const subscribe = (planId) => { setSubscribed(true); setPlan(planId); };

  return (
    <AppContext.Provider value={{

      user, subscribed, plan,
      freeResults, premiumResults,
      
      login, logout, register, subscribe,
      setFreeResults, setPremiumResults,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
