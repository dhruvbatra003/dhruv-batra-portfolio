'use client'
import { useEffect, useState, useCallback } from 'react'

type Content = Record<string, unknown>

const INPUT = 'w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#F1FAEE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#ab0511] transition-colors'
const LABEL = 'block text-xs uppercase tracking-widest text-[#F1FAEE]/40 mb-1.5'
const SECTION = 'mb-10'
const CARD = 'bg-[#111] border border-[#222] p-6 mb-4'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [content, setContent] = useState<Content | null>(null)
  const [tab, setTab] = useState('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const loadContent = useCallback(async (pw: string) => {
    setLoading(true)
    const res = await fetch('/api/content')
    if (res.ok) {
      const data = await res.json()
      setContent(data)
      localStorage.setItem('admin_pw', pw)
      setAuthed(true)
    } else {
      setAuthError('Failed to load content')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('admin_pw')
    if (saved) {
      setPassword(saved)
      loadContent(saved)
    }
  }, [loadContent])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    const res = await fetch('/api/content/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      await loadContent(password)
    } else {
      setAuthError('Incorrect password')
    }
  }

  const save = async () => {
    setSaving(true)
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, content }),
    })
    setSaving(false)
    if (res.ok) showToast('Saved! Changes are live.')
    else showToast('Error saving. Try again.')
  }

  const set = (path: string, value: unknown) => {
    setContent((prev) => {
      if (!prev) return prev
      const next = structuredClone(prev)
      const keys = path.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = (path: string): any => {
    if (!content) return ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return path.split('.').reduce((obj: any, key) => obj?.[key], content) ?? ''
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-[#ab0511] font-black uppercase tracking-widest text-2xl mb-2">Dashboard</div>
          <div className="text-[#F1FAEE]/40 text-sm uppercase tracking-widest mb-8">Dhruv Batra Portfolio</div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={LABEL}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {authError && <p className="text-[#ab0511] text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-[#ab0511] text-[#F1FAEE] py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#8a0410] transition-colors"
            >
              {loading ? 'Loading...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!content) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#F1FAEE]/40">Loading...</div>

  const tabs = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'insights', label: 'Insights' },
    { id: 'demographics', label: 'Demographics' },
    { id: 'cases', label: 'Case Studies' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F1FAEE]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#222] flex items-center justify-between px-8 py-4">
        <div>
          <span className="text-[#ab0511] font-black uppercase tracking-widest">Dashboard</span>
          <span className="text-[#F1FAEE]/20 ml-3 text-sm">/ {tabs.find(t => t.id === tab)?.label}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-[#F1FAEE]/40 text-xs uppercase tracking-widest hover:text-[#F1FAEE] transition-colors">
            View Site ↗
          </a>
          <button
            onClick={() => { localStorage.removeItem('admin_pw'); setAuthed(false); setPassword('') }}
            className="text-[#F1FAEE]/40 text-xs uppercase tracking-widest hover:text-[#F1FAEE] transition-colors"
          >
            Logout
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="bg-[#ab0511] text-[#F1FAEE] px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-[#8a0410] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-48 shrink-0 border-r border-[#222] min-h-screen pt-8 px-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full text-left px-4 py-3 text-sm uppercase tracking-widest mb-1 transition-colors ${
                tab === t.id
                  ? 'bg-[#ab0511]/10 text-[#ab0511] border-l-2 border-[#ab0511]'
                  : 'text-[#F1FAEE]/40 hover:text-[#F1FAEE] hover:bg-[#1a1a1a]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-10 max-w-3xl">

          {/* HERO */}
          {tab === 'hero' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#222] pb-4">Hero Section</h2>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Identity</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className={LABEL}>First Name</label><input className={INPUT} value={get('hero.firstName')} onChange={e => set('hero.firstName', e.target.value)} /></div>
                  <div><label className={LABEL}>Last Name</label><input className={INPUT} value={get('hero.lastName')} onChange={e => set('hero.lastName', e.target.value)} /></div>
                </div>
                <div className="mb-4"><label className={LABEL}>Tagline</label><input className={INPUT} value={get('hero.tagline')} onChange={e => set('hero.tagline', e.target.value)} /></div>
                <div className="mb-4">
                  <label className={LABEL}>Tags (comma separated)</label>
                  <input
                    className={INPUT}
                    value={get('hero.tags').join(', ')}
                    onChange={e => set('hero.tags', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={LABEL}>CTA Button Text</label><input className={INPUT} value={get('hero.ctaText')} onChange={e => set('hero.ctaText', e.target.value)} /></div>
                  <div><label className={LABEL}>Total Followers Badge</label><input className={INPUT} value={get('hero.totalFollowers')} onChange={e => set('hero.totalFollowers', e.target.value)} /></div>
                </div>
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Platform Counts</h3>
                {get('hero.platforms').map((p: { name: string; count: string }, i: number) => (
                  <div key={i} className="grid grid-cols-2 gap-4 mb-3">
                    <div><label className={LABEL}>Platform</label><input className={INPUT} value={p.name} onChange={e => { const arr = [...get('hero.platforms')]; arr[i] = { ...arr[i], name: e.target.value }; set('hero.platforms', arr) }} /></div>
                    <div><label className={LABEL}>Count</label><input className={INPUT} value={p.count} onChange={e => { const arr = [...get('hero.platforms')]; arr[i] = { ...arr[i], count: e.target.value }; set('hero.platforms', arr) }} /></div>
                  </div>
                ))}
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Navigation</h3>
                <div className="mb-4"><label className={LABEL}>Nav CTA Text</label><input className={INPUT} value={get('nav.ctaText')} onChange={e => set('nav.ctaText', e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* ABOUT */}
          {tab === 'about' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#222] pb-4">About Section</h2>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Headline</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className={LABEL}>Headline</label><input className={INPUT} value={get('about.headline')} onChange={e => set('about.headline', e.target.value)} /></div>
                  <div><label className={LABEL}>Accent Word</label><input className={INPUT} value={get('about.headlineAccent')} onChange={e => set('about.headlineAccent', e.target.value)} /></div>
                </div>
                <div><label className={LABEL}>Bio</label><textarea className={INPUT + ' resize-none h-28'} value={get('about.bio')} onChange={e => set('about.bio', e.target.value)} /></div>
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Education</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={LABEL}>Institution</label><input className={INPUT} value={get('about.education.institution')} onChange={e => set('about.education.institution', e.target.value)} /></div>
                  <div><label className={LABEL}>Field</label><input className={INPUT} value={get('about.education.field')} onChange={e => set('about.education.field', e.target.value)} /></div>
                </div>
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Stats</h3>
                {get('about.stats').map((stat: { value: string; label: string }, i: number) => (
                  <div key={i} className="grid grid-cols-2 gap-4 mb-3">
                    <div><label className={LABEL}>Value</label><input className={INPUT} value={stat.value} onChange={e => { const arr = [...get('about.stats')]; arr[i] = { ...arr[i], value: e.target.value }; set('about.stats', arr) }} /></div>
                    <div><label className={LABEL}>Label</label><input className={INPUT} value={stat.label} onChange={e => { const arr = [...get('about.stats')]; arr[i] = { ...arr[i], label: e.target.value }; set('about.stats', arr) }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSIGHTS */}
          {tab === 'insights' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-2 border-b border-[#222] pb-4">Insights Metrics</h2>
              <p className="text-[#F1FAEE]/40 text-sm mb-8">Update these from your Instagram insights screenshot.</p>

              <div className={SECTION}>
                {get('insights.metrics').map((metric: { label: string; value: string; highlight: boolean }, i: number) => (
                  <div key={i} className={CARD}>
                    <div className="grid grid-cols-3 gap-4 items-end">
                      <div><label className={LABEL}>Label</label><input className={INPUT} value={metric.label} onChange={e => { const arr = [...get('insights.metrics')]; arr[i] = { ...arr[i], label: e.target.value }; set('insights.metrics', arr) }} /></div>
                      <div><label className={LABEL}>Value</label><input className={INPUT} value={metric.value} onChange={e => { const arr = [...get('insights.metrics')]; arr[i] = { ...arr[i], value: e.target.value }; set('insights.metrics', arr) }} /></div>
                      <div className="flex items-center gap-3 pb-2.5">
                        <input type="checkbox" id={`hl-${i}`} checked={metric.highlight} onChange={e => { const arr = [...get('insights.metrics')]; arr[i] = { ...arr[i], highlight: e.target.checked }; set('insights.metrics', arr) }} className="accent-[#ab0511] w-4 h-4" />
                        <label htmlFor={`hl-${i}`} className="text-xs uppercase tracking-widest text-[#F1FAEE]/40">Highlight</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Retention Block</h3>
                <div className="mb-4"><label className={LABEL}>Headline</label><input className={INPUT} value={get('insights.retention.headline')} onChange={e => set('insights.retention.headline', e.target.value)} /></div>
                <div><label className={LABEL}>Body Text</label><textarea className={INPUT + ' resize-none h-20'} value={get('insights.retention.body')} onChange={e => set('insights.retention.body', e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* DEMOGRAPHICS */}
          {tab === 'demographics' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#222] pb-4">Audience Demographics</h2>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Age & Gender</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className={LABEL}>Top Age Group</label><input className={INPUT} value={get('insights.demographics.topAgeGroup.value')} onChange={e => set('insights.demographics.topAgeGroup.value', e.target.value)} /></div>
                  <div><label className={LABEL}>Age Detail (e.g. 42% of Audience)</label><input className={INPUT} value={get('insights.demographics.topAgeGroup.detail')} onChange={e => set('insights.demographics.topAgeGroup.detail', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={LABEL}>Gender Ratio (e.g. 70/30)</label><input className={INPUT} value={get('insights.demographics.genderRatio.value')} onChange={e => set('insights.demographics.genderRatio.value', e.target.value)} /></div>
                  <div><label className={LABEL}>Gender Detail</label><input className={INPUT} value={get('insights.demographics.genderRatio.detail')} onChange={e => set('insights.demographics.genderRatio.detail', e.target.value)} /></div>
                </div>
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Top Cities</h3>
                {get('insights.demographics.topCities').map((city: { name: string; percent: string }, i: number) => (
                  <div key={i} className="grid grid-cols-2 gap-4 mb-3">
                    <div><label className={LABEL}>City</label><input className={INPUT} value={city.name} onChange={e => { const arr = [...get('insights.demographics.topCities')]; arr[i] = { ...arr[i], name: e.target.value }; set('insights.demographics.topCities', arr) }} /></div>
                    <div><label className={LABEL}>Percent</label><input className={INPUT} value={city.percent} onChange={e => { const arr = [...get('insights.demographics.topCities')]; arr[i] = { ...arr[i], percent: e.target.value }; set('insights.demographics.topCities', arr) }} /></div>
                  </div>
                ))}
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Top Countries</h3>
                {get('insights.demographics.topCountries').map((country: { name: string; percent: string }, i: number) => (
                  <div key={i} className="grid grid-cols-2 gap-4 mb-3">
                    <div><label className={LABEL}>Country</label><input className={INPUT} value={country.name} onChange={e => { const arr = [...get('insights.demographics.topCountries')]; arr[i] = { ...arr[i], name: e.target.value }; set('insights.demographics.topCountries', arr) }} /></div>
                    <div><label className={LABEL}>Percent</label><input className={INPUT} value={country.percent} onChange={e => { const arr = [...get('insights.demographics.topCountries')]; arr[i] = { ...arr[i], percent: e.target.value }; set('insights.demographics.topCountries', arr) }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CASE STUDIES */}
          {tab === 'cases' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#222] pb-4">Case Studies</h2>
              {get('caseStudies').map((study: { category: string; title: string; description: string; metric: string; metricLabel: string }, i: number) => (
                <div key={i} className={CARD}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#ab0511]">Campaign {i + 1}</span>
                    <button
                      onClick={() => { const arr = get('caseStudies').filter((_: unknown, idx: number) => idx !== i); set('caseStudies', arr) }}
                      className="text-[#F1FAEE]/20 hover:text-[#ab0511] text-xs uppercase tracking-widest transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className={LABEL}>Category</label><input className={INPUT} value={study.category} onChange={e => { const arr = [...get('caseStudies')]; arr[i] = { ...arr[i], category: e.target.value }; set('caseStudies', arr) }} /></div>
                    <div><label className={LABEL}>Brand / Title</label><input className={INPUT} value={study.title} onChange={e => { const arr = [...get('caseStudies')]; arr[i] = { ...arr[i], title: e.target.value }; set('caseStudies', arr) }} /></div>
                  </div>
                  <div className="mb-4"><label className={LABEL}>Description</label><textarea className={INPUT + ' resize-none h-20'} value={study.description} onChange={e => { const arr = [...get('caseStudies')]; arr[i] = { ...arr[i], description: e.target.value }; set('caseStudies', arr) }} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={LABEL}>Result Metric</label><input className={INPUT} value={study.metric} onChange={e => { const arr = [...get('caseStudies')]; arr[i] = { ...arr[i], metric: e.target.value }; set('caseStudies', arr) }} /></div>
                    <div><label className={LABEL}>Metric Label</label><input className={INPUT} value={study.metricLabel} onChange={e => { const arr = [...get('caseStudies')]; arr[i] = { ...arr[i], metricLabel: e.target.value }; set('caseStudies', arr) }} /></div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => set('caseStudies', [...get('caseStudies'), { category: '', title: '', description: '', metric: '', metricLabel: '' }])}
                className="w-full border border-dashed border-[#333] text-[#F1FAEE]/30 py-3 text-sm uppercase tracking-widest hover:border-[#ab0511] hover:text-[#ab0511] transition-colors"
              >
                + Add Case Study
              </button>
            </div>
          )}

          {/* TESTIMONIALS */}
          {tab === 'testimonials' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#222] pb-4">Testimonials</h2>
              {get('testimonials').map((t: { quote: string; role: string; company: string; featured: boolean }, i: number) => (
                <div key={i} className={CARD}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#ab0511]">Testimonial {i + 1}</span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F1FAEE]/40 cursor-pointer">
                        <input type="checkbox" checked={t.featured} onChange={e => { const arr = [...get('testimonials')]; arr[i] = { ...arr[i], featured: e.target.checked }; set('testimonials', arr) }} className="accent-[#ab0511]" />
                        Featured
                      </label>
                      <button
                        onClick={() => { const arr = get('testimonials').filter((_: unknown, idx: number) => idx !== i); set('testimonials', arr) }}
                        className="text-[#F1FAEE]/20 hover:text-[#ab0511] text-xs uppercase tracking-widest transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mb-4"><label className={LABEL}>Quote</label><textarea className={INPUT + ' resize-none h-20'} value={t.quote} onChange={e => { const arr = [...get('testimonials')]; arr[i] = { ...arr[i], quote: e.target.value }; set('testimonials', arr) }} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={LABEL}>Role / Title</label><input className={INPUT} value={t.role} onChange={e => { const arr = [...get('testimonials')]; arr[i] = { ...arr[i], role: e.target.value }; set('testimonials', arr) }} /></div>
                    <div><label className={LABEL}>Company</label><input className={INPUT} value={t.company} onChange={e => { const arr = [...get('testimonials')]; arr[i] = { ...arr[i], company: e.target.value }; set('testimonials', arr) }} /></div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => set('testimonials', [...get('testimonials'), { quote: '', role: '', company: '', featured: false }])}
                className="w-full border border-dashed border-[#333] text-[#F1FAEE]/30 py-3 text-sm uppercase tracking-widest hover:border-[#ab0511] hover:text-[#ab0511] transition-colors"
              >
                + Add Testimonial
              </button>
            </div>
          )}

          {/* CONTACT */}
          {tab === 'contact' && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#222] pb-4">Contact & Footer</h2>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Media Kit</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={LABEL}>Year</label><input className={INPUT} value={get('contact.mediaKitYear')} onChange={e => set('contact.mediaKitYear', e.target.value)} /></div>
                  <div><label className={LABEL}>Download URL</label><input className={INPUT} value={get('contact.mediaKitUrl')} onChange={e => set('contact.mediaKitUrl', e.target.value)} /></div>
                </div>
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Contact Details</h3>
                <div className="mb-4"><label className={LABEL}>WhatsApp</label><input className={INPUT} value={get('contact.whatsapp')} onChange={e => set('contact.whatsapp', e.target.value)} /></div>
                <div><label className={LABEL}>Email</label><input className={INPUT} value={get('contact.email')} onChange={e => set('contact.email', e.target.value)} /></div>
              </div>

              <div className={SECTION}>
                <h3 className="text-xs uppercase tracking-widest text-[#ab0511] mb-4">Footer</h3>
                <div><label className={LABEL}>Copyright Text</label><input className={INPUT} value={get('footer.copyright')} onChange={e => set('footer.copyright', e.target.value)} /></div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#111] border border-[#ab0511] text-[#F1FAEE] px-6 py-3 text-sm uppercase tracking-widest z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
