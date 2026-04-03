import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../baseurl'
const TOAST_CONTAINER_ID = 'register-toast'

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register } = useApp()
  const [form, setForm] = useState({ full_name: '', email: '', password: '', age: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      const { data } = await axios.post(`${BASE_URL}/users/register`, {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        age: form.age,
      })

      register({ full_name: data.user.name, email: data.user.email, token: data.token })
      toast.success(data.message || 'Account created!', { containerId: TOAST_CONTAINER_ID })
      setTimeout(() => navigate('/quiz'), 800)
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong.'
      toast.error(message, { containerId: TOAST_CONTAINER_ID })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 flex items-center justify-center p-5">
     <ToastContainer
  containerId={TOAST_CONTAINER_ID}
  autoClose={4000}
  newestOnTop
  theme="light"
/>
      <div className="bg-white rounded-3xl shadow-2xl shadow-purple-100 p-10 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <Logo size={60} />
        </div>

        <h2 className="text-2xl font-black text-indigo-950 text-center mb-1">{t('register.title')}</h2>
        <p className="text-gray-500 text-sm text-center mb-8">{t('register.subtitle')}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('register.name')}</label>
            <input
              type="text"
              value={form.full_name}
              onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
              placeholder="Sophie Martin"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('register.email')}</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('register.password')}</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Age</label>
  <input
    type="number"
    value={form.age}
    onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
    placeholder="25"
    min="13"
    max="120"
    required
  />
</div>

 
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white py-3.5 rounded-xl font-bold text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-purple-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {loading ? 'Creating account…' : t('register.submit')}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-4">{t('register.privacy')}</p>

        <div className="mt-5 text-center space-y-3">
          <p className="text-sm text-gray-500">
            {t('register.haveAccount')}{' '}
            <Link to="/login" className="text-violet-600 font-semibold hover:underline">
              {t('register.login')}
            </Link>
          </p>
          <Link to="/" className="block text-xs text-gray-400 hover:text-gray-600 transition">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
