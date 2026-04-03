import { useTranslation } from 'react-i18next'

const PILLAR_NAMES = {
  1: { icon: '🧭', name: 'Alignment' },
  2: { icon: '🎭', name: 'Authenticity' },
  3: { icon: '❤️', name: 'Heart vs Ego' },
  4: { icon: '🤝', name: 'Union' },
  5: { icon: '🧘', name: 'Consciousness' },
  6: { icon: '🎁', name: 'Generosity' },
  7: { icon: '🙏', name: 'Gratitude' },
  8: { icon: '🦉', name: 'Wisdom' },
  9: { icon: '☮️', name: 'Peace' },
}

const CITATIONS = {
  1: {
    strong:  { text: 'When thought, word and action are in harmony, life becomes an act of truth.', author: 'Gandhi' },
    medium:  { text: 'Alignment is a path, not a destination.', author: 'Popular wisdom' },
    weak:    { text: 'The gap between what we say and do is the cradle of our suffering.', author: null },
  },
  2: {
    strong:  { text: 'To be yourself in a world that wants to make you someone else is the greatest accomplishment.', author: 'Emerson' },
    medium:  { text: 'Authenticity is a muscle: the more you use it, the stronger it becomes.', author: 'Brené Brown' },
    weak:    { text: 'The mask we wear ends up suffocating who we truly are.', author: null },
  },
  3: {
    strong:  { text: 'The heart that gives without counting receives a hundredfold.', author: 'Rumi' },
    medium:  { text: 'Between ego\'s calculation and the heart\'s impulse, there is a space.', author: 'Frankl' },
    weak:    { text: 'The ego asks "What will I receive?" The heart: "What can I offer?"', author: 'Wayne Dyer' },
  },
  4: {
    strong:  { text: 'Forgiveness is a gift you give yourself.', author: 'Tutu' },
    medium:  { text: 'Union begins with forgiveness, and forgiveness with understanding.', author: "Ho'oponopono" },
    weak:    { text: 'Every grudge is a poison you drink hoping the other suffers.', author: 'Mandela' },
  },
  5: {
    strong:  { text: 'The conscious observer transforms every moment into an opportunity for awakening.', author: 'Eckhart Tolle' },
    medium:  { text: 'Consciousness develops with patient practice.', author: 'Jon Kabat-Zinn' },
    weak:    { text: 'Living on autopilot is walking through a beautiful garden with eyes closed.', author: 'Thich Nhat Hanh' },
  },
  6: {
    strong:  { text: 'True generosity is not measured by what you give, but by the love behind it.', author: 'Mother Teresa' },
    medium:  { text: 'Generosity is born when we stop calculating and listen to our heart.', author: 'Khalil Gibran' },
    weak:    { text: 'He who only gives to receive has never truly given.', author: null },
  },
  7: {
    strong:  { text: 'Gratitude turns what we have into enough, and enough into abundance.', author: 'Melody Beattie' },
    medium:  { text: 'Learning to say thank you is learning to see light in the darkness.', author: null },
    weak:    { text: 'Ingratitude is the daughter of pride. The miracle is already here.', author: null },
  },
  8: {
    strong:  { text: 'True wisdom is knowing that you know nothing.', author: 'Socrates' },
    medium:  { text: 'Wisdom grows when we accept our limits with kindness.', author: 'Lao Tzu' },
    weak:    { text: 'He who thinks he knows everything has stopped learning.', author: null },
  },
  9: {
    strong:  { text: 'Peace is not the absence of storm, but the calm at its center.', author: 'Thomas à Kempis' },
    medium:  { text: 'Inner peace is built one breath at a time.', author: 'Thich Nhat Hanh' },
    weak:    { text: 'As long as war rages within you, there is peace nowhere.', author: null },
  },
}

const RECOMMENDATIONS = {
  1: {
    strong: 'Continue meditation and mindfulness. Inspire those around you through your natural coherence.',
    medium: 'Keep a journal to spot inconsistencies. Practice 5 min daily meditation. Choose one aligned intention each morning.',
    weak:   'Identify one situation where you are not aligned and transform it. Personal development coaching is recommended.',
  },
  2: {
    strong: 'Use your authenticity to inspire others. Share your truth boldly — it gives others permission to do the same.',
    medium: 'Practice saying no once a day. Notice where you wear a mask and ask why.',
    weak:   'Start with small authentic acts. Therapy or coaching can help uncover the root of the mask.',
  },
  3: {
    strong: 'Your heart leads — keep giving freely. Mentor others in unconditional generosity.',
    medium: 'Before helping, check: is there an expectation attached? Practice giving anonymously.',
    weak:   'Start with small gestures of pure giving. Notice the ego\'s voice and gently redirect to the heart.',
  },
  4: {
    strong: 'Your capacity for forgiveness and union is a gift. Facilitate harmony in your relationships.',
    medium: 'Practice Ho\'oponopono daily: "I\'m sorry, please forgive me, thank you, I love you."',
    weak:   'Identify one grudge and consciously choose to release it. Seek support if needed.',
  },
  5: {
    strong: 'Your consciousness is your compass. Deepen your practice and share your awareness.',
    medium: 'Meditate 10 min daily. Keep a mindfulness journal. Pause before reacting.',
    weak:   'Start with 2 min of conscious breathing daily. Reduce autopilot by changing small routines.',
  },
  6: {
    strong: 'Your generosity is abundant. Channel it wisely — give sustainably without depleting yourself.',
    medium: 'Give one anonymous act of kindness weekly. Notice when you expect recognition.',
    weak:   'Practice giving without any expectation of return, starting with small things.',
  },
  7: {
    strong: 'Your gratitude is a superpower. Share it — write thank-you notes, express appreciation daily.',
    medium: 'Start a gratitude journal: 3 things each morning. Tell someone you appreciate them today.',
    weak:   'Begin with one thing you\'re grateful for each day. Gratitude is a practice, not a feeling.',
  },
  8: {
    strong: 'Your wisdom inspires. Keep learning and stay humble — the wisest know there is always more.',
    medium: 'Challenge one belief you hold. Seek perspectives different from your own.',
    weak:   'Practice saying "I don\'t know" and sitting with uncertainty. Curiosity is the seed of wisdom.',
  },
  9: {
    strong: 'Your inner peace radiates. Be a calm presence for others in turbulent times.',
    medium: 'Practice cardiac coherence (5-5-5) three times a day. Identify your stress triggers.',
    weak:   'Start with 10 min of silence daily. Identify what disturbs your peace and address it gently.',
  },
}

function getLevel(lovePercent) {
  if (lovePercent >= 70) return 'strong'
  if (lovePercent >= 40) return 'medium'
  return 'weak'
}

function getLevelLabel(level) {
  if (level === 'strong') return { label: '🟢 STRONG', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  if (level === 'medium') return { label: '🟡 DEVELOPING', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' }
  return { label: '🔴 TO WORK ON', color: 'text-red-500 bg-red-50 border-red-200' }
}

export default function PremiumReport({ pillarPercents, global }) {
  const { t } = useTranslation()

  const pillarList = Object.entries(pillarPercents).map(([id, val]) => ({
    id: Number(id),
    ...val,
    level: getLevel(val.love),
  })).sort((a, b) => a.love - b.love)

  const priorities = pillarList.slice(0, 3)

  const ACTION_PLAN = {
    daily: [
      '🌅 Morning: 3 gratitudes in your journal',
      '🧘 5 min conscious breathing before starting your day',
      '🌙 Evening: identify 1 moment of alignment today',
    ],
    weekly: [
      '📓 Review your journal — spot recurring patterns',
      '💬 Have one authentic conversation you\'ve been avoiding',
      '🎁 One anonymous act of generosity',
    ],
    monthly: [
      '📊 Re-read your EgoXLove report and measure your evolution',
      '🎯 Set one intention per pillar to develop',
      '🤝 Share your progress with a trusted person',
    ],
  }

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-900 rounded-3xl p-6 text-white text-center mb-6 shadow-2xl">
        <div className="text-3xl mb-2">⭐</div>
        <h2 className="text-2xl font-black mb-1">Premium Report</h2>
        <p className="text-sm text-white/70">Detailed analysis · 9 pillars · Personalized recommendations</p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="text-3xl font-black text-yellow-400">{global.ego}%</div>
            <div className="text-xs text-yellow-300/80 font-bold">🟡 EGO</div>
          </div>
          <div className="text-white/30 flex items-center text-2xl">⚡</div>
          <div className="text-center">
            <div className="text-3xl font-black text-violet-300">{global.love}%</div>
            <div className="text-xs text-violet-300/80 font-bold">💜 LOVE</div>
          </div>
        </div>
      </div>

      {/* Pillar by pillar */}
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📊 Pillar Analysis</h3>
      <div className="space-y-4 mb-8">
        {Object.entries(pillarPercents).map(([id, val]) => {
          const pid = Number(id)
          const pillar = PILLAR_NAMES[pid]
          const level = getLevel(val.love)
          const { label, color } = getLevelLabel(level)
          const citation = CITATIONS[pid]?.[level]
          const reco = RECOMMENDATIONS[pid]?.[level]

          return (
            <div key={id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{pillar?.icon}</span>
                  <span className="font-black text-indigo-950 text-sm">{t(`pillars.${pid}.name`)}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>{label}</span>
              </div>

              {/* Score bars */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>🟡 EGO</span><span>{val.ego}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${val.ego}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>💜 LOVE</span><span>{val.love}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${val.love}%` }} />
                  </div>
                </div>
              </div>

              {/* Citation */}
              {citation && (
                <blockquote className="border-l-2 border-violet-300 pl-3 mb-3">
                  <p className="text-xs text-gray-600 italic leading-relaxed">"{citation.text}"</p>
                  {citation.author && <footer className="text-[10px] text-gray-400 mt-1">— {citation.author}</footer>}
                </blockquote>
              )}

              {/* Recommendation */}
              {reco && (
                <div className="bg-violet-50 rounded-xl p-3">
                  <p className="text-xs text-violet-800 leading-relaxed">💡 {reco}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Top 3 priorities */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-black text-amber-800 mb-3">🎯 Your 3 Development Priorities</h3>
        {priorities.map((p, i) => (
          <div key={p.id} className="flex items-start gap-2 mb-2">
            <span className="text-amber-600 font-black text-sm">{i + 1}.</span>
            <p className="text-xs text-amber-900">
              <span className="font-bold">{PILLAR_NAMES[p.id]?.icon} {t(`pillars.${p.id}.name`)} ({p.love}% LOVE)</span>
              {' → '}{RECOMMENDATIONS[p.id]?.[p.level]}
            </p>
          </div>
        ))}
      </div>

      {/* 30-day action plan */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-sm font-black text-indigo-950 mb-4">📅 30-Day Action Plan</h3>
        {[
          { label: '🌅 Daily', items: ACTION_PLAN.daily },
          { label: '📆 Weekly', items: ACTION_PLAN.weekly },
          { label: '🗓️ Monthly', items: ACTION_PLAN.monthly },
        ].map(({ label, items }) => (
          <div key={label} className="mb-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</div>
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}