import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/logo.png'
import { FREE_QUESTIONS, computeFreeScores, pillarPercents, globalPercents } from '../data/questions';

const PILLAR_COLORS = [
  'bg-blue-100 text-blue-800',
  'bg-yellow-100 text-yellow-800',
  'bg-pink-100 text-pink-900',
  'bg-emerald-100 text-emerald-800',
  'bg-purple-100 text-purple-800',
  'bg-red-100 text-red-800',
  'bg-lime-100 text-lime-800',
  'bg-indigo-100 text-indigo-800',
  'bg-teal-100 text-teal-800',
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function FreeQuizPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language === 'es' ? 'es' : 'en';

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = FREE_QUESTIONS[current];
  const total = FREE_QUESTIONS.length;
  const progress = Math.round(((current + 1) / total) * 100);
  const pillarT = t(`pillars.${q.pillar}`, { returnObjects: true });
  const colorClass = PILLAR_COLORS[(q.pillar - 1) % PILLAR_COLORS.length];
  const isLast = current === total - 1;

  const select = (idx) => setAnswers(a => ({ ...a, [current]: idx }));

  const goNext = () => {
    if (isLast) {
      const scores = computeFreeScores(answers);
      const percents = pillarPercents(scores);
      const global = globalPercents(percents);
      sessionStorage.setItem('egoxlove_free_results', JSON.stringify({ pillarPercents: percents, global }));
      navigate('/results');
    } else {
      setCurrent(c => c + 1);
    }
  };

  const goPrev = () => { if (current > 0) setCurrent(c => c - 1); };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
   
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-5 py-3">
          <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logoImg} alt="EgoXLove" className="w-[50px]" />
            </Link>
          </div>
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-violet-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      
      <div className="max-w-xl mx-auto px-5 pt-6">
       
        <div className="text-center mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${colorClass}`}>
            {pillarT.icon} {t('quiz.free')} · {pillarT.name}
          </span>
        </div>

    
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-[fadeIn_0.2s_ease]">
          <p className="text-base font-semibold text-indigo-950 text-center leading-relaxed mb-6">
            {q[lang] || q.en}
          </p>

          <div className="flex flex-col gap-2.5">
            {(q.options[lang] || q.options.en).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => select(idx)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm text-left transition-all duration-150 cursor-pointer
                  ${answers[current] === idx
                    ? 'border-violet-500 bg-violet-50 font-semibold'
                    : 'border-gray-200 hover:border-violet-200 hover:bg-violet-50/40'
                  }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                  ${answers[current] === idx ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="text-gray-800 leading-snug">{opt}</span>
              </button>
            ))}
          </div>
        </div>

    
        <div className="flex gap-3 mt-5 justify-center">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t('quiz.prev')}
          </button>
          <button
            onClick={goNext}
            disabled={answers[current] === undefined}
            className="px-8 py-2.5 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-xl text-sm font-bold hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed min-w-[140px] text-center"
          >
            {isLast ? t('quiz.finish') : t('quiz.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
