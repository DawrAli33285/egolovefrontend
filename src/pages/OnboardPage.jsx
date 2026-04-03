import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';

export default function OnboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', age: '', email: '' });
  const [consentEmail, setConsentEmail] = useState(false);
  const [consentContact, setConsentContact] = useState(false);

  const canStart = form.name.trim() && form.email.trim() && consentEmail && consentContact;

  const handleStart = () => {
    if (!canStart) return;
    sessionStorage.setItem('egoxlove_user', JSON.stringify({
      ...form,
      consentEmail,
      consentContact,
      consentDate: new Date().toISOString(),
    }));
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-amber-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl shadow-purple-100 p-10 w-full max-w-sm text-center">

        <div className="flex justify-center mb-4">
          <Logo size={72} />
        </div>

        <h2 className="text-2xl font-black text-indigo-950 mb-1">{t('onboard.title')}</h2>
        <p className="text-gray-500 text-sm mb-8">{t('onboard.subtitle')}</p>

        <div className="text-left space-y-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {t('onboard.name')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
              placeholder={t('onboard.namePlaceholder')}
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {t('onboard.email')} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
              placeholder={t('onboard.emailPlaceholder')}
              autoComplete="email"
            />
          </div>

          {/* Age (optional) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {t('onboard.age')} <span className="text-gray-400 font-normal">({t('onboard.optional')})</span>
            </label>
            <input
              type="number"
              value={form.age}
              onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
              placeholder={t('onboard.agePlaceholder')}
              min="12"
              max="99"
            />
          </div>

          {/* Consent checkboxes */}
          <div className="pt-2 space-y-3">

            <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${consentEmail ? 'border-violet-400 bg-violet-50' : 'border-gray-200 hover:border-violet-200'}`}>
              <div className="mt-0.5 flex-shrink-0">
                <div
                  onClick={() => setConsentEmail(v => !v)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${consentEmail ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`}
                >
                  {consentEmail && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-700 leading-relaxed" onClick={() => setConsentEmail(v => !v)}>
                <span className="font-semibold text-indigo-900">{t('onboard.consentEmail')}</span>
                <br/><span className="text-gray-500">{t('onboard.consentEmailDesc')}</span>
              </span>
            </label>

            <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${consentContact ? 'border-violet-400 bg-violet-50' : 'border-gray-200 hover:border-violet-200'}`}>
              <div className="mt-0.5 flex-shrink-0">
                <div
                  onClick={() => setConsentContact(v => !v)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${consentContact ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`}
                >
                  {consentContact && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-700 leading-relaxed" onClick={() => setConsentContact(v => !v)}>
                <span className="font-semibold text-indigo-900">{t('onboard.consentContact')}</span>
                <br/><span className="text-gray-500">{t('onboard.consentContactDesc')}</span>
              </span>
            </label>

          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart}
          className="mt-6 w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white py-4 rounded-xl font-bold text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-purple-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          {t('onboard.submit')}
        </button>

        {!canStart && (form.name || form.email) && (
          <p className="text-[11px] text-amber-600 mt-3">
            {!form.email.trim() ? '📧 ' + t('onboard.emailRequired') :
             !consentEmail || !consentContact ? '☑️ ' + t('onboard.consentRequired') : ''}
          </p>
        )}

        <p className="text-[11px] text-gray-400 mt-3">{t('onboard.privacy')}</p>
      </div>
    </div>
  );
}