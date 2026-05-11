'use client'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import type contentJson from '../../content.json'

type Content = typeof contentJson

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: { clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: 0.9, ease } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
}

export default function HomeClient({ content }: { content: Content }) {
  const c = content
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 600], [0, -100])

  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-4 md:px-margin-desktop py-3 md:py-4">
        <div className="font-headline-h1 text-2xl md:text-headline-h1 font-black uppercase text-primary">
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
        <button className="bg-brand-crimson text-brand-offwhite px-4 md:px-6 py-2 font-bold uppercase tracking-widest text-xs md:text-sm crimson-hover-invert transition-all">
          {c.nav.ctaText}
        </button>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center px-4 md:px-margin-desktop overflow-hidden">
          <motion.div className="absolute inset-0 hero-grid" style={{ y: gridY }} />
          <div className="absolute left-0 top-0 w-1 h-full bg-brand-crimson" />
          <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 border-b border-l border-brand-crimson/20" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center pt-24 pb-16 md:py-32">

            {/* Left: text */}
            <div>
              <motion.div
                className="flex items-center gap-4 mb-6 md:mb-10"
                initial="hidden" animate="visible" variants={fadeUp}
                transition={{ delay: 0.1, duration: 0.7, ease }}
              >
                <div className="w-10 h-px bg-brand-crimson" />
                <span className="font-label-caps text-brand-crimson uppercase tracking-[0.25em] text-xs md:text-sm">
                  {c.hero.tagline}
                </span>
              </motion.div>

              <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl uppercase leading-none mb-6 md:mb-10 overflow-hidden">
                <motion.span
                  className="block"
                  initial="hidden" animate="visible" variants={clipReveal}
                  transition={{ delay: 0.25, duration: 0.9, ease }}
                >
                  {c.hero.firstName}
                </motion.span>
                <motion.span
                  className="block text-outlined"
                  initial="hidden" animate="visible" variants={clipReveal}
                  transition={{ delay: 0.4, duration: 0.9, ease }}
                >
                  {c.hero.lastName}
                </motion.span>
              </h1>

              <motion.div
                className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12"
                initial="hidden" animate="visible" variants={staggerContainer}
                transition={{ delayChildren: 0.55 }}
              >
                {c.hero.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={staggerItem}
                    className="border border-brand-crimson/60 text-brand-crimson px-3 md:px-4 py-1.5 font-label-caps uppercase text-xs tracking-widest hover:bg-brand-crimson hover:text-brand-offwhite transition-all"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-3 md:gap-4 mb-10 md:mb-14"
                initial="hidden" animate="visible" variants={fadeUp}
                transition={{ delay: 0.65, duration: 0.7, ease }}
              >
                <button className="bg-brand-crimson text-brand-offwhite px-7 md:px-10 py-3 md:py-4 font-bold uppercase tracking-widest text-sm crimson-hover-invert transition-all">
                  {c.hero.ctaText}
                </button>
                <button className="border border-brand-offwhite/40 text-brand-offwhite px-7 md:px-10 py-3 md:py-4 font-bold uppercase tracking-widest text-sm hover:border-brand-offwhite transition-all">
                  Media Kit
                </button>
              </motion.div>

              <motion.div
                className="flex gap-6 md:gap-10 pt-6 md:pt-8 border-t border-outline-variant"
                initial="hidden" animate="visible" variants={fadeUp}
                transition={{ delay: 0.8, duration: 0.7, ease }}
              >
                {c.hero.platforms.map((p) => (
                  <div key={p.name}>
                    <div className="text-xl md:text-headline-h2 font-headline-h2 font-black leading-none mb-1">
                      {p.count}
                    </div>
                    <div className="font-label-caps uppercase opacity-50 text-[10px] md:text-xs tracking-widest">
                      {p.name}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Portrait — mobile (simple, no floating badges) */}
            <motion.div
              className="relative lg:hidden w-full h-[70vw] max-h-[360px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-brand-crimson z-20" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-brand-crimson z-20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.about.portraitUrl}
                alt={c.meta.name}
                className="w-full h-full grayscale contrast-125 object-cover object-[center_35%]"
              />
              {/* Inline badges for mobile */}
              <div className="absolute bottom-4 left-4 z-20 bg-brand-black border-l-4 border-brand-crimson px-4 py-2">
                <div className="text-2xl font-black leading-none text-brand-crimson">{c.hero.totalFollowers}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mt-0.5">Total Followers</div>
              </div>
            </motion.div>

            {/* Portrait — desktop (with floating badges) */}
            <motion.div
              className="relative hidden lg:block h-[75vh] max-h-[700px]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -top-5 -right-5 w-20 h-20 border-t-4 border-r-4 border-brand-crimson z-20" />
              <div className="absolute -bottom-5 -left-5 w-20 h-20 border-b-4 border-l-4 border-brand-crimson z-20" />

              <motion.div
                className="absolute -left-10 top-1/3 z-20 bg-brand-black border-l-4 border-brand-crimson p-5 shadow-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-display-lg text-display-lg leading-none text-brand-crimson">
                  {c.hero.totalFollowers}
                </div>
                <div className="font-label-caps uppercase opacity-60 text-xs mt-1">Total Followers</div>
              </motion.div>

              <motion.div
                className="absolute -right-6 bottom-1/4 z-20 bg-brand-crimson p-5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-headline-h1 text-headline-h1 leading-none text-brand-offwhite">
                  {c.about.stats[0].value}
                </div>
                <div className="font-label-caps uppercase text-brand-offwhite/70 text-xs mt-1">
                  {c.about.stats[0].label}
                </div>
              </motion.div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.about.portraitUrl}
                alt={c.meta.name}
                className="w-full h-full grayscale contrast-125 object-cover object-[center_35%]"
              />
            </motion.div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant/50">
            <span className="font-label-caps uppercase tracking-widest text-xs">Scroll</span>
            <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-brand-crimson to-transparent" />
          </div>
        </section>

        {/* ── Brand Marquee ── */}
        <section className="pt-12 md:pt-16 pb-0 bg-brand-black overflow-hidden">
          <motion.p
            className="text-center font-label-caps uppercase tracking-[0.25em] text-xs md:text-sm text-brand-offwhite/40 mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Past Collaborations
          </motion.p>
          <div className="pb-12 md:pb-16 overflow-hidden">
            <div className="flex items-center whitespace-nowrap marquee-track">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 flex-shrink-0">
                  {c.brands.map((brand) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={brand.name}
                      src={brand.logo}
                      alt={brand.name}
                      className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex-shrink-0"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="px-4 md:px-margin-desktop py-16 md:py-section-gap grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            className="md:col-span-5 relative"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={slideLeft}
          >
            <div className="absolute -top-4 -left-4 w-full h-full border border-brand-crimson z-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`${c.meta.name} portrait`}
              className="w-full h-[280px] md:h-[600px] object-cover object-[center_35%] grayscale relative z-10"
              src={c.about.portraitUrl}
            />
          </motion.div>

          <motion.div
            className="md:col-span-7"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="font-headline-h1 text-2xl md:text-headline-h1 uppercase mb-6 md:mb-8">
              {c.about.headline}{' '}
              <span className="text-brand-crimson italic">{c.about.headlineAccent}</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="font-body-lg text-base md:text-body-lg mb-6 md:mb-8 max-w-2xl text-on-surface-variant">
              {c.about.bio}
            </motion.p>
            <motion.div variants={staggerItem} className="border-l-4 border-brand-crimson pl-6 py-2 mb-8 md:mb-12">
              <div className="text-xl md:text-headline-h2 font-headline-h2 leading-none mb-2">
                {c.about.education.institution}
              </div>
              <div className="font-label-caps uppercase opacity-60 text-sm">{c.about.education.field}</div>
            </motion.div>
            <motion.div variants={staggerItem} className="grid grid-cols-2 gap-6 md:gap-8">
              {c.about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-headline-h2 font-headline-h2 text-brand-crimson">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="font-label-caps uppercase opacity-60 text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Niches ── */}
        <section className="px-4 md:px-margin-desktop py-16 md:py-section-gap bg-surface-container-lowest">
          <motion.h2
            className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase mb-10 md:mb-16 text-center overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={clipReveal}
          >
            Core <span className="text-brand-crimson">Niches</span>
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {c.niches.map((niche) => (
              <motion.div
                key={niche.title}
                variants={staggerItem}
                className="bg-brand-card p-6 md:p-10 border border-transparent hover:border-brand-crimson transition-all group"
              >
                <span className="material-symbols-outlined text-brand-crimson text-4xl md:text-6xl mb-4 md:mb-6 block group-hover:scale-110 transition-transform">
                  {niche.icon}
                </span>
                <h3 className="font-headline-h2 text-base md:text-headline-h2 uppercase mb-2 md:mb-4">{niche.title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base">{niche.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Insights ── */}
        <section id="insights" className="px-4 md:px-margin-desktop py-16 md:py-section-gap">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <div>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase leading-none mb-3 md:mb-4 overflow-hidden">
                <motion.span
                  className="block"
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={clipReveal}
                >
                  Instagram <span className="text-brand-crimson italic">Insights</span>
                </motion.span>
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base">Verified performance metrics across all social touchpoints.</p>
            </div>
            <div className="flex bg-brand-card p-1 self-start">
              {['30 Days', '60 Days', '90 Days'].map((period, i) => (
                <button
                  key={period}
                  className={
                    i === 0
                      ? 'px-4 md:px-6 py-2 bg-brand-crimson text-brand-offwhite font-bold uppercase tracking-widest text-xs'
                      : 'px-4 md:px-6 py-2 hover:bg-surface-variant text-on-surface-variant font-bold uppercase tracking-widest text-xs transition-all'
                  }
                >
                  {period}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10 md:mb-section-gap"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {c.insights.metrics.map((metric) => (
              <motion.div key={metric.label} variants={staggerItem} className="bg-brand-card p-4 md:p-6 border-b-4 border-brand-crimson">
                <div className="font-label-caps uppercase opacity-60 mb-2 text-xs">{metric.label}</div>
                <div className={`text-2xl md:text-headline-h1 font-headline-h1 ${metric.highlight ? 'text-brand-crimson' : ''}`}>
                  <AnimatedCounter value={metric.value} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            <motion.div
              className="md:col-span-8 bg-brand-card p-6 md:p-12"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              variants={slideLeft}
            >
              <h3 className="font-headline-h2 text-base md:text-headline-h2 uppercase mb-6 md:mb-12">Audience Demographics</h3>
              <div className="grid grid-cols-2 gap-6 md:gap-12">
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-2 md:mb-4 text-xs">Top Age Group</div>
                  <div className="text-2xl md:text-headline-h1 font-headline-h1">{c.insights.demographics.topAgeGroup.value}</div>
                  <div className="font-label-caps uppercase opacity-50 mt-1 md:mt-2 text-xs">{c.insights.demographics.topAgeGroup.detail}</div>
                </div>
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-2 md:mb-4 text-xs">Gender Ratio</div>
                  <div className="text-2xl md:text-headline-h1 font-headline-h1">{c.insights.demographics.genderRatio.value}</div>
                  <div className="font-label-caps uppercase opacity-50 mt-1 md:mt-2 text-xs">{c.insights.demographics.genderRatio.detail}</div>
                </div>
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-2 md:mb-4 text-xs">Top Cities</div>
                  <div className="space-y-1.5 md:space-y-2">
                    {c.insights.demographics.topCities.map((city) => (
                      <div key={city.name} className="flex justify-between font-bold text-sm md:text-base">
                        <span>{city.name}</span><span>{city.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-label-caps uppercase text-brand-crimson mb-2 md:mb-4 text-xs">Top Countries</div>
                  <div className="space-y-1.5 md:space-y-2">
                    {c.insights.demographics.topCountries.map((country) => (
                      <div key={country.name} className="flex justify-between font-bold text-sm md:text-base">
                        <span>{country.name}</span><span>{country.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:col-span-4 bg-brand-crimson p-8 md:p-12 text-brand-offwhite flex flex-col justify-center"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              variants={slideRight}
            >
              <span className="material-symbols-outlined text-6xl md:text-8xl mb-4 md:mb-6">trending_up</span>
              <h3 className="text-2xl md:text-headline-h1 font-headline-h1 uppercase leading-none mb-4 md:mb-6">{c.insights.retention.headline}</h3>
              <p className="text-base md:text-body-lg">{c.insights.retention.body}</p>
            </motion.div>
          </div>
        </section>

        {/* ── Case Studies ── */}
        <section className="px-4 md:px-margin-desktop py-16 md:py-section-gap">
          <motion.h2
            className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase mb-10 md:mb-16 overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={clipReveal}
          >
            Case <span className="text-brand-crimson">Studies</span>
          </motion.h2>
          <motion.div
            className="space-y-4 md:space-y-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {c.caseStudies.map((study) => (
              <motion.div
                key={study.title}
                variants={staggerItem}
                className="bg-brand-card p-6 md:p-12 border-l-8 border-brand-crimson grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 group hover:bg-surface-variant transition-all"
              >
                <div className="md:col-span-1">
                  <div className="font-label-caps text-brand-crimson mb-1 md:mb-2 uppercase text-xs">{study.category}</div>
                  <h3 className="text-2xl md:text-headline-h1 font-headline-h1">{study.title}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-base md:text-body-lg text-on-surface-variant">{study.description}</p>
                </div>
                <div className="md:col-span-1 flex md:flex-col md:justify-center md:text-right items-center gap-4 md:gap-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant">
                  <div className="text-3xl md:text-headline-h1 font-headline-h1 leading-none">
                    <AnimatedCounter value={study.metric} />
                  </div>
                  <div className="font-label-caps uppercase opacity-60 text-xs">{study.metricLabel}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Testimonials ── */}
        <section className="px-4 md:px-margin-desktop py-16 md:py-section-gap bg-surface-container-lowest">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {c.testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`bg-brand-card p-6 md:p-12 relative overflow-hidden ${t.featured ? 'border-t-8 border-brand-crimson' : ''}`}
              >
                <span className="material-symbols-outlined absolute -top-4 -right-4 text-brand-crimson text-7xl md:text-9xl opacity-20">
                  format_quote
                </span>
                <p className="text-base md:text-headline-h2 font-headline-h2 mb-6 md:mb-10 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-bold uppercase tracking-wider text-sm">{t.role}</div>
                  <div className="text-brand-crimson font-label-caps uppercase text-xs md:text-sm">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Contact ── */}
        <section className="px-4 md:px-margin-desktop py-16 md:py-section-gap grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            className="bg-brand-crimson p-8 md:p-16 text-brand-offwhite"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={slideLeft}
          >
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase mb-6 md:mb-8 leading-none">
              Ready to <br /><span className="italic">Collab?</span>
            </h2>
            <p className="text-base md:text-body-lg mb-8 md:mb-12 max-w-sm">
              Download the comprehensive {c.contact.mediaKitYear} Media Kit including detailed audience splits, pricing, and campaign types.
            </p>
            <a
              href={c.contact.mediaKitUrl}
              className="bg-brand-offwhite text-brand-black px-8 md:px-12 py-4 md:py-5 font-bold uppercase tracking-tighter text-sm hover:bg-brand-black hover:text-brand-offwhite transition-all inline-flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Download Media Kit
            </a>
          </motion.div>

          <motion.div
            className="p-6 md:p-16 border border-outline-variant"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={slideRight}
          >
            <h3 className="text-2xl md:text-headline-h1 font-headline-h1 uppercase mb-8 md:mb-12">Management</h3>
            <div className="space-y-8 md:space-y-12">
              <div>
                <div className="font-label-caps uppercase text-brand-crimson mb-2 text-xs">WhatsApp for Business</div>
                <div className="text-xl md:text-headline-h2 font-headline-h2">{c.contact.whatsapp}</div>
              </div>
              <div>
                <div className="font-label-caps uppercase text-brand-crimson mb-2 text-xs">Email Inquiries</div>
                <div className="text-xl md:text-headline-h2 font-headline-h2">{c.contact.email}</div>
              </div>
              <div className="flex gap-4 md:gap-6">
                {c.contact.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 md:w-12 md:h-12 bg-brand-card border border-outline-variant flex items-center justify-center hover:bg-brand-crimson transition-all"
                  >
                    <span className="material-symbols-outlined text-lg md:text-xl">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full relative overflow-hidden bg-surface-container-lowest border-t border-outline-variant flex flex-col items-center justify-center py-16 md:py-section-gap px-4 md:px-margin-desktop text-center">
        <div className="font-display-xl text-[48px] md:text-display-xl font-black uppercase text-surface-variant/20 pointer-events-none absolute -bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 w-full select-none whitespace-nowrap">
          {c.meta.name.toUpperCase()}
        </div>
        <motion.div
          className="relative z-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex flex-wrap gap-6 md:gap-12 mb-10 md:mb-16 justify-center">
            {c.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-on-surface-variant hover:text-primary hover:italic transition-all uppercase font-bold tracking-widest text-xs md:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-body-md text-xs md:text-body-md text-on-surface-variant/60 tracking-[0.2em] md:tracking-[0.3em]">
            {c.footer.copyright}
          </p>
        </motion.div>
      </footer>
    </>
  )
}
