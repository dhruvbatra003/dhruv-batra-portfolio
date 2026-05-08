import content from '../content.json'

const c = content

export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-margin-desktop py-4">
        <div className="font-headline-h1 text-headline-h1 font-black uppercase text-primary">
          {c.meta.name}
        </div>
        <div className="hidden md:flex items-center gap-8">
          {c.nav.links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={
                link === c.nav.activeLink
                  ? 'text-primary font-bold border-b-2 border-brand-crimson pb-1'
                  : 'text-on-surface-variant font-medium hover:text-primary transition-colors duration-200'
              }
            >
              {link}
            </a>
          ))}
        </div>
        <button className="bg-brand-crimson text-brand-offwhite px-6 py-2 font-bold uppercase tracking-widest crimson-hover-invert transition-all">
          {c.nav.ctaText}
        </button>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center px-margin-desktop overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 hero-grid" />
          {/* Left crimson edge */}
          <div className="absolute left-0 top-0 w-1 h-full bg-brand-crimson" />
          {/* Top-right corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 border-b border-l border-brand-crimson/20" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-32">

            {/* Left: Content */}
            <div>
              {/* Overline */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-px bg-brand-crimson" />
                <span className="font-label-caps text-brand-crimson uppercase tracking-[0.25em] text-sm">
                  {c.hero.tagline}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display-xl text-display-xl uppercase leading-none mb-10">
                <span className="block">{c.hero.firstName}</span>
                <span className="block text-outlined">{c.hero.lastName}</span>
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-12">
                {c.hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-brand-crimson/60 text-brand-crimson px-4 py-1.5 font-label-caps uppercase text-xs tracking-widest hover:bg-brand-crimson hover:text-brand-offwhite transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-14">
                <button className="bg-brand-crimson text-brand-offwhite px-10 py-4 font-bold uppercase tracking-widest crimson-hover-invert transition-all">
                  {c.hero.ctaText}
                </button>
                <button className="border border-brand-offwhite/40 text-brand-offwhite px-10 py-4 font-bold uppercase tracking-widest hover:border-brand-offwhite transition-all">
                  Media Kit
                </button>
              </div>

              {/* Platform stats */}
              <div className="flex gap-10 pt-8 border-t border-outline-variant">
                {c.hero.platforms.map((p) => (
                  <div key={p.name}>
                    <div className="font-headline-h2 text-headline-h2 font-black leading-none mb-1">
                      {p.count}
                    </div>
                    <div className="font-label-caps uppercase opacity-50 text-xs tracking-widest">
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Portrait + stat badge */}
            <div className="relative hidden lg:block h-[75vh] max-h-[700px]">
              {/* Corner decorations */}
              <div className="absolute -top-5 -right-5 w-20 h-20 border-t-4 border-r-4 border-brand-crimson z-20" />
              <div className="absolute -bottom-5 -left-5 w-20 h-20 border-b-4 border-l-4 border-brand-crimson z-20" />

              {/* Floating followers badge */}
              <div className="absolute -left-10 top-1/3 z-20 bg-brand-black border-l-4 border-brand-crimson p-5 shadow-2xl">
                <div className="font-display-lg text-display-lg leading-none text-brand-crimson">
                  {c.hero.totalFollowers}
                </div>
                <div className="font-label-caps uppercase opacity-60 text-xs mt-1">
                  Total Followers
                </div>
              </div>

              {/* Floating views badge */}
              <div className="absolute -right-6 bottom-1/4 z-20 bg-brand-crimson p-5">
                <div className="font-headline-h1 text-headline-h1 leading-none text-brand-offwhite">
                  {c.about.stats[0].value}
                </div>
                <div className="font-label-caps uppercase text-brand-offwhite/70 text-xs mt-1">
                  {c.about.stats[0].label}
                </div>
              </div>

              {/* Portrait */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.about.portraitUrl}
                alt={c.meta.name}
                className="w-full h-full grayscale contrast-125 object-cover object-top"
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant/50">
            <span className="font-label-caps uppercase tracking-widest text-xs">Scroll</span>
            <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-brand-crimson to-transparent" />
          </div>
        </section>

        {/* Brand Marquee */}
        <section className="py-16 bg-brand-black overflow-hidden">
          <div className="flex items-center whitespace-nowrap marquee-track">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-24 pr-24 flex-shrink-0">
                {c.brands.map((brand) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={brand.name}
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex-shrink-0"
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-brand-crimson z-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`${c.meta.name} portrait`}
              className="w-full grayscale relative z-10"
              src={c.about.portraitUrl}
            />
          </div>
          <div className="md:col-span-7">
            <h2 className="font-headline-h1 text-headline-h1 uppercase mb-8">
              {c.about.headline}{' '}
              <span className="text-brand-crimson italic">{c.about.headlineAccent}</span>
            </h2>
            <p className="font-body-lg text-body-lg mb-8 max-w-2xl text-on-surface-variant">
              {c.about.bio}
            </p>
            <div className="border-l-4 border-brand-crimson pl-6 py-2 mb-12">
              <div className="font-headline-h2 text-headline-h2 leading-none mb-2">
                {c.about.education.institution}
              </div>
              <div className="font-label-caps uppercase opacity-60">
                {c.about.education.field}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {c.about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline-h2 text-brand-crimson">{stat.value}</div>
                  <div className="font-label-caps uppercase opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Niches */}
        <section className="px-margin-desktop py-section-gap bg-surface-container-lowest">
          <h2 className="font-display-lg text-display-lg uppercase mb-16 text-center">
            Core <span className="text-brand-crimson">Niches</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {c.niches.map((niche) => (
              <div
                key={niche.title}
                className="bg-brand-card p-10 border border-transparent hover:border-brand-crimson transition-all group"
              >
                <span className="material-symbols-outlined text-brand-crimson text-6xl mb-6 block group-hover:scale-110 transition-transform">
                  {niche.icon}
                </span>
                <h3 className="font-headline-h2 uppercase mb-4">{niche.title}</h3>
                <p className="text-on-surface-variant">{niche.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section id="insights" className="px-margin-desktop py-section-gap">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display-lg text-display-lg uppercase leading-none mb-4">
                Instagram <span className="text-brand-crimson italic">Insights</span>
              </h2>
              <p className="text-on-surface-variant">
                Verified performance metrics across all social touchpoints.
              </p>
            </div>
            <div className="flex bg-brand-card p-1">
              {['30 Days', '60 Days', '90 Days'].map((period, i) => (
                <button
                  key={period}
                  className={
                    i === 0
                      ? 'px-6 py-2 bg-brand-crimson text-brand-offwhite font-bold uppercase tracking-widest text-sm'
                      : 'px-6 py-2 hover:bg-surface-variant text-on-surface-variant font-bold uppercase tracking-widest text-sm transition-all'
                  }
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-section-gap">
            {c.insights.metrics.map((metric) => (
              <div key={metric.label} className="bg-brand-card p-6 border-b-4 border-brand-crimson">
                <div className="font-label-caps uppercase opacity-60 mb-2">{metric.label}</div>
                <div className={`font-headline-h1 ${metric.highlight ? 'text-brand-crimson' : ''}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 bg-brand-card p-12">
              <h3 className="font-headline-h2 uppercase mb-12">Audience Demographics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-4">Top Age Group</div>
                  <div className="font-headline-h1">{c.insights.demographics.topAgeGroup.value}</div>
                  <div className="font-label-caps uppercase opacity-50 mt-2">
                    {c.insights.demographics.topAgeGroup.detail}
                  </div>
                </div>
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-4">Gender Ratio</div>
                  <div className="font-headline-h1">{c.insights.demographics.genderRatio.value}</div>
                  <div className="font-label-caps uppercase opacity-50 mt-2">
                    {c.insights.demographics.genderRatio.detail}
                  </div>
                </div>
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-4">Top Cities</div>
                  <div className="space-y-2 mt-2">
                    {c.insights.demographics.topCities.map((city) => (
                      <div key={city.name} className="flex justify-between font-bold">
                        <span>{city.name}</span>
                        <span>{city.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-4">Top Countries</div>
                  <div className="space-y-2 mt-2">
                    {c.insights.demographics.topCountries.map((country) => (
                      <div key={country.name} className="flex justify-between font-bold">
                        <span>{country.name}</span>
                        <span>{country.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 bg-brand-crimson p-12 text-brand-offwhite flex flex-col justify-center">
              <span className="material-symbols-outlined text-8xl mb-6">trending_up</span>
              <h3 className="font-headline-h1 uppercase leading-none mb-6">
                {c.insights.retention.headline}
              </h3>
              <p className="font-body-lg">{c.insights.retention.body}</p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="px-margin-desktop py-section-gap">
          <h2 className="font-display-lg text-display-lg uppercase mb-16">
            Case <span className="text-brand-crimson">Studies</span>
          </h2>
          <div className="space-y-8">
            {c.caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-brand-card p-12 border-l-8 border-brand-crimson grid md:grid-cols-4 gap-8 group hover:bg-surface-variant transition-all"
              >
                <div className="md:col-span-1">
                  <div className="font-label-caps text-brand-crimson mb-2 uppercase">
                    {study.category}
                  </div>
                  <h3 className="font-headline-h1">{study.title}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="font-body-lg text-on-surface-variant">{study.description}</p>
                </div>
                <div className="md:col-span-1 flex flex-col justify-center text-right">
                  <div className="font-headline-h1 leading-none">{study.metric}</div>
                  <div className="font-label-caps uppercase opacity-60">{study.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-margin-desktop py-section-gap bg-surface-container-lowest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-brand-card p-12 relative overflow-hidden ${t.featured ? 'border-t-8 border-brand-crimson' : ''}`}
              >
                <span className="material-symbols-outlined absolute -top-4 -right-4 text-brand-crimson text-9xl opacity-20">
                  format_quote
                </span>
                <p className="font-headline-h2 mb-10 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-bold uppercase tracking-wider">{t.role}</div>
                  <div className="text-brand-crimson font-label-caps uppercase">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-brand-crimson p-16 text-brand-offwhite">
            <h2 className="font-display-lg text-display-lg uppercase mb-8 leading-none">
              Ready to <br />
              <span className="italic">Collab?</span>
            </h2>
            <p className="font-body-lg mb-12 max-w-sm">
              Download the comprehensive {c.contact.mediaKitYear} Media Kit including detailed
              audience splits, pricing, and campaign types.
            </p>
            <a
              href={c.contact.mediaKitUrl}
              className="bg-brand-offwhite text-brand-black px-12 py-5 font-bold uppercase tracking-tighter hover:bg-brand-black hover:text-brand-offwhite transition-all inline-flex items-center gap-4"
            >
              <span className="material-symbols-outlined">download</span>
              Download Media Kit
            </a>
          </div>
          <div className="p-16 border border-outline-variant">
            <h3 className="font-headline-h1 uppercase mb-12">Management</h3>
            <div className="space-y-12">
              <div>
                <div className="font-label-caps uppercase text-brand-crimson mb-2">
                  WhatsApp for Business
                </div>
                <div className="font-headline-h2">{c.contact.whatsapp}</div>
              </div>
              <div>
                <div className="font-label-caps uppercase text-brand-crimson mb-2">
                  Email Inquiries
                </div>
                <div className="font-headline-h2">{c.contact.email}</div>
              </div>
              <div className="flex gap-6">
                {c.contact.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="w-12 h-12 bg-brand-card border border-outline-variant flex items-center justify-center hover:bg-brand-crimson transition-all"
                  >
                    <span className="material-symbols-outlined">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden bg-surface-container-lowest border-t border-outline-variant flex flex-col items-center justify-center py-section-gap px-margin-desktop text-center">
        <div className="font-display-xl text-display-xl font-black uppercase text-surface-variant/20 pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-full select-none">
          {c.meta.name.toUpperCase()}
        </div>
        <div className="relative z-10">
          <div className="flex gap-12 mb-16 flex-wrap justify-center">
            {c.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-on-surface-variant hover:text-primary hover:italic transition-all uppercase font-bold tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant/60 tracking-[0.3em]">
            {c.footer.copyright}
          </p>
        </div>
      </footer>
    </>
  )
}
