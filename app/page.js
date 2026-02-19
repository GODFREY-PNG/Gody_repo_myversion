'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  FiGithub, FiLinkedin, FiMail, FiExternalLink,
  FiMenu, FiX, FiArrowRight, FiAward, FiChevronDown
} from 'react-icons/fi'
import {
  SiPython, SiPandas, SiNumpy, SiScikitlearn,
  SiStreamlit, SiFastapi, SiMongodb, SiTableau,
  SiPlotly, SiTensorflow
} from 'react-icons/si'

// ─── DATA ──────────────────────────────────────────────────────────
const NAV_ITEMS = ['Work', 'About', 'Skills', 'Contact']

const STATS = [
  { value: '85%', label: 'Bankruptcy prediction accuracy', sub: 'Financial Risk' },
  { value: '0.89', label: 'ROC-AUC on churn detection', sub: 'Retention' },
  { value: '−23%', label: 'Churn rate in 6 months', sub: 'Telecom client' },
  { value: '+40%', label: 'Marketing ROI via segmentation', sub: 'Retail client' },
]

const PROJECTS = [
  {
    id: 'bankruptcy',
    domain: 'Financial Risk',
    domainColor: 'blue',
    title: 'Corporate Bankruptcy Prediction',
    headline: 'A lender was absorbing preventable losses. No system existed to flag high-risk entities before they defaulted.',
    problem: 'Credit decisions were reactive — losses surfaced only after default, with no early-warning capability.',
    method: 'RandomForest classifier trained on 10 years of financial records. Optimized for recall to minimize missed bankruptcies. Explainable feature-importance outputs for non-technical credit teams.',
    result: '85% prediction accuracy. $2M+ in estimated losses prevented. Full team adoption within 30 days. 60% reduction in manual review time.',
    metrics: [{ n: '85%', l: 'Accuracy' }, { n: '$2M+', l: 'Losses prevented' }, { n: '60%', l: 'Less manual review' }],
    stack: ['Python', 'Scikit-learn', 'RandomForest', 'Pandas'],
    github: 'https://github.com/GODFREY-PNG/ITALIAN-BANKRUPTCY-PREDICTION',
    image: '/italian banckruptcy confuison matrix.png',
    featured: true,
  },
  {
    id: 'churn',
    domain: 'Customer Retention',
    domainColor: 'violet',
    title: 'Churn Early-Warning System',
    headline: 'A telecom operator was losing customers with zero advance notice. By cancellation time, intervention was impossible.',
    problem: 'No proactive system existed. The business only learned about churn after it happened.',
    method: 'Logistic Regression with SMOTE for class imbalance. Weekly scoring pipeline auto-triggers retention workflows for at-risk accounts.',
    result: '0.89 ROC-AUC. 3-week lead time before churn. 23% churn rate drop in 6 months. Risk scores now drive daily team prioritization.',
    metrics: [{ n: '0.89', l: 'ROC-AUC' }, { n: '−23%', l: 'Churn rate' }, { n: '3 wks', l: 'Lead time' }],
    stack: ['Python', 'Logistic Regression', 'SMOTE', 'GridSearch'],
    github: 'https://github.com/GODFREY-PNG/TELCO_CHURN_PROJECT',
    image: '/ODDS RATIO HORIZONTAL BAR TELCOCHURN.png',
    featured: false,
  },
  {
    id: 'segmentation',
    domain: 'Customer Analytics',
    domainColor: 'green',
    title: 'Customer Intelligence & Segmentation',
    headline: 'A retailer was spending marketing budget equally on all customers — ignoring that some are worth 10× more than others.',
    problem: 'All customers treated identically. High-value segments were invisible. Marketing spend was wasted.',
    method: 'K-Means clustering + PCA on 50K+ records. Silhouette score 0.62. Each segment profiled by revenue potential, churn risk, and product affinity.',
    result: '5 actionable segments uncovered, 3 previously invisible. +40% marketing ROI in one quarter. Product roadmap reprioritized on data.',
    metrics: [{ n: '+40%', l: 'Marketing ROI' }, { n: '5', l: 'Segments found' }, { n: '0.62', l: 'Silhouette score' }],
    stack: ['Python', 'K-Means', 'PCA', 'Plotly'],
    github: 'https://github.com/GODFREY-PNG/CUSTOMER_SEGMENTATION_PROJECT',
    image: '/Customer_segmentation.png',
    featured: false,
  },
  {
    id: 'volatility',
    domain: 'Market Forecasting',
    domainColor: 'amber',
    title: 'Real-Time Volatility Forecasting API',
    headline: 'Investment decisions relied on yesterday\'s data. Volatility spikes were noticed too late to act.',
    problem: 'No live risk signal existed. Analysts were making trades without knowing today\'s volatility environment.',
    method: 'GARCH model on historical price data. FastAPI backend serving forecasts in real time. AlphaVantage live data integration.',
    result: 'Analysts receive live volatility alerts before executing trades. Risk-adjusted decision-making replaces gut feel.',
    metrics: [{ n: 'Live', l: 'Real-time API' }, { n: 'GARCH', l: 'Model type' }, { n: 'REST', l: 'FastAPI' }],
    stack: ['Python', 'FastAPI', 'GARCH', 'AlphaVantage'],
    github: 'https://github.com/GODFREY-PNG/STOCKS-VOLATILITY-FORECAST',
    image: '/Apple daily returns vs 2SD conditional volatility.png',
    featured: false,
  },
  {
    id: 'insurance',
    domain: 'Healthcare Analytics',
    domainColor: 'green',
    title: 'Insurance Risk Evaluation App',
    headline: 'Underwriters needed an instant risk estimate without running models manually each time.',
    problem: 'Cost prediction required manual analyst time for every new applicant. No self-service tool existed.',
    method: 'RandomForest regression trained on healthcare cost data. Deployed as an interactive Streamlit app accessible by non-technical staff.',
    result: 'Live predictions in under 2 seconds. Underwriters get instant, explainable cost estimates. Deployed on cloud.',
    metrics: [{ n: '<2s', l: 'Prediction time' }, { n: 'Live', l: 'Cloud deployed' }, { n: 'R²=0.86', l: 'Model score' }],
    stack: ['Python', 'Streamlit', 'RandomForest', 'Scikit-learn'],
    github: 'https://github.com/GODFREY-PNG/insurance-cost-predictor',
    demo: 'https://insurance-cost-predictor-j8my5uinh8d2eyrr32pltd.streamlit.app/',
    image: '/app.png',
    featured: false,
  },
]

const SKILLS = [
  {
    area: 'Predictive Modeling',
    items: ['Classification & Regression', 'Ensemble Methods (RF, XGBoost)', 'Logistic & Linear Models', 'Hyperparameter Tuning', 'Cross-validation & Evaluation'],
  },
  {
    area: 'Data & Analysis',
    items: ['Statistical Modeling', 'Time-Series Analysis', 'Unsupervised Clustering (K-Means, PCA)', 'A/B Testing & Hypothesis Testing', 'Feature Engineering'],
  },
  {
    area: 'Engineering & Deployment',
    items: ['FastAPI REST APIs', 'Streamlit Applications', 'Data Pipelines & ETL', 'Model Monitoring', 'Cloud Deployment'],
  },
  {
    area: 'Business Translation',
    items: ['Explainable AI (SHAP, feature importance)', 'Executive-ready dashboards', 'ROI framing for technical results', 'Stakeholder communication', 'Project documentation'],
  },
]

const TECH = [
  { icon: SiPython, name: 'Python' },
  { icon: SiPandas, name: 'Pandas' },
  { icon: SiNumpy, name: 'NumPy' },
  { icon: SiScikitlearn, name: 'Scikit-learn' },
  { icon: SiTensorflow, name: 'TensorFlow' },
  { icon: SiFastapi, name: 'FastAPI' },
  { icon: SiStreamlit, name: 'Streamlit' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiTableau, name: 'Tableau' },
  { icon: SiPlotly, name: 'Plotly' },
]

// ─── COLOR MAP ─────────────────────────────────────────────────────
const COLOR = {
  blue:   { bar: '#1A56DB', badge: '#EBF1FD', text: '#1A56DB' },
  violet: { bar: '#6D28D9', badge: '#EDE9FE', text: '#6D28D9' },
  green:  { bar: '#047857', badge: '#ECFDF5', text: '#047857' },
  amber:  { bar: '#B45309', badge: '#FEF3C7', text: '#B45309' },
} as const

type DomainColor = keyof typeof COLOR

// ─── HELPERS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

// ─── COMPONENTS ────────────────────────────────────────────────────
function DomainBadge({ domain, color }: { domain: string; color: DomainColor }) {
  const c = COLOR[color]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase font-mono"
      style={{ background: c.badge, color: c.text }}
    >
      {domain}
    </span>
  )
}

function TechTag({ name }: { name: string }) {
  return (
    <span className="px-2 py-0.5 bg-[#F1F3F6] rounded text-[11px] font-mono text-[#3D4451] font-medium">
      {name}
    </span>
  )
}

function NarrativeRow({
  type, text,
}: { type: 'problem' | 'method' | 'result'; text: string }) {
  const map = {
    problem: { label: 'Problem', bg: '#FEE2E2', color: '#B91C1C', icon: '✕' },
    method:  { label: 'Approach', bg: '#FEF3C7', color: '#B45309', icon: '⚙' },
    result:  { label: 'Impact', bg: '#ECFDF5', color: '#047857', icon: '✓' },
  }
  const m = map[type]
  return (
    <div className="flex gap-3 items-start">
      <div
        className="w-5 h-5 rounded-[5px] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
        style={{ background: m.bg, color: m.color }}
      >
        {m.icon}
      </div>
      <div>
        <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9AA0AD] mb-0.5">
          {m.label}
        </p>
        <p className="text-[13.5px] text-[#3D4451] leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function ProjectCard({ p, featured = false }: { p: typeof PROJECTS[0]; featured?: boolean }) {
  const c = COLOR[p.domainColor as DomainColor]

  if (featured) {
    return (
      <motion.article
        variants={fadeUp}
        className="group relative bg-white rounded-[18px] border border-[rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1"
        style={{ borderLeft: `3px solid ${c.bar}` }}
      >
        <div className="grid lg:grid-cols-[1fr_380px]">
          {/* Left: text */}
          <div className="p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <DomainBadge domain={p.domain} color={p.domainColor as DomainColor} />
              <span className="text-[10px] font-mono text-[#9AA0AD] uppercase tracking-wider font-semibold">Featured Project</span>
            </div>

            <div>
              <h3 className="font-serif text-[1.55rem] font-normal text-[#0B0F19] leading-tight mb-2">
                {p.title}
              </h3>
              <p className="text-[14px] text-[#5A6272] leading-relaxed italic">{p.headline}</p>
            </div>

            <div className="flex gap-3">
              {p.metrics.map(m => (
                <div key={m.l} className="flex-1 bg-[#F6F7F9] rounded-xl p-3 text-center">
                  <p className="font-serif text-[1.6rem] text-[#0B0F19] leading-none mb-1">{m.n}</p>
                  <p className="text-[10px] font-mono text-[#9AA0AD] uppercase tracking-wide">{m.l}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5">
              <NarrativeRow type="problem" text={p.problem} />
              <NarrativeRow type="method"  text={p.method} />
              <NarrativeRow type="result"  text={p.result} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EDEEF2]">
              <div className="flex gap-1.5 flex-wrap">
                {p.stack.map(t => <TechTag key={t} name={t} />)}
              </div>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1A56DB] px-3 py-1.5 rounded-lg border border-[#EBF1FD] hover:bg-[#1A56DB] hover:text-white transition-all duration-200"
              >
                <FiGithub size={13} />
                GitHub
              </a>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative bg-[#F6F7F9] min-h-[280px] lg:min-h-0">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={fadeUp}
      className="group bg-white rounded-[18px] border border-[rgba(0,0,0,0.08)] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1"
      style={{ borderTop: `3px solid ${c.bar}` }}
    >
      {/* Image */}
      <div className="relative h-44 bg-[#F6F7F9] flex-shrink-0">
        <Image src={p.image} alt={p.title} fill className="object-cover" />
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <DomainBadge domain={p.domain} color={p.domainColor as DomainColor} />

        <div>
          <h3 className="font-serif text-[1.15rem] font-normal text-[#0B0F19] leading-tight mb-1.5">
            {p.title}
          </h3>
          <p className="text-[13px] text-[#5A6272] leading-relaxed italic">{p.headline}</p>
        </div>

        {/* Metrics row */}
        <div className="flex gap-2">
          {p.metrics.map(m => (
            <div key={m.l} className="flex-1 bg-[#F6F7F9] rounded-lg p-2 text-center">
              <p className="font-serif text-[1.1rem] text-[#0B0F19] leading-none mb-0.5">{m.n}</p>
              <p className="text-[9px] font-mono text-[#9AA0AD] uppercase tracking-wide">{m.l}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <NarrativeRow type="problem" text={p.problem} />
          <NarrativeRow type="method"  text={p.method} />
          <NarrativeRow type="result"  text={p.result} />
        </div>

        <div className="pt-3 border-t border-[#EDEEF2] flex items-center justify-between mt-auto">
          <div className="flex gap-1.5 flex-wrap">
            {p.stack.slice(0, 3).map(t => <TechTag key={t} name={t} />)}
          </div>
          <div className="flex gap-2">
            {'demo' in p && p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-[#0B0F19] px-2.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
              >
                Demo <FiExternalLink size={11} />
              </a>
            )}
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B0F19] px-2.5 py-1.5 rounded-lg border border-[#EDEEF2] hover:bg-[#F6F7F9] transition-colors"
            >
              <FiGithub size={11} />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [year, setYear]               = useState('')
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => { setYear(new Date().getFullYear().toString()) }, [])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const filters = ['All', 'Financial Risk', 'Customer Retention', 'Customer Analytics', 'Market Forecasting', 'Healthcare Analytics']
  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.domain === activeFilter)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="relative bg-[#F6F7F9] min-h-screen overflow-x-hidden font-sans">

      {/* Read-progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#1A56DB] z-[999] origin-left"
        style={{ width: progressWidth }}
      />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.08)]' : 'bg-transparent'
      }`}>
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <button onClick={() => scrollTo('home')} className="text-left">
            <p className="font-serif text-[1.05rem] text-[#0B0F19] leading-none">Godfrey Imbindi</p>
            <p className="font-mono text-[9px] text-[#1A56DB] uppercase tracking-[2px] font-medium mt-0.5">
              Data Scientist · ML Engineer
            </p>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-[13.5px] font-medium text-[#3D4451] hover:text-[#0B0F19] transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 bg-[#0B0F19] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1A56DB] transition-colors"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#0B0F19]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden bg-white border-t border-[#EDEEF2] px-6 py-5 flex flex-col gap-4"
            >
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-[15px] font-medium text-[#0B0F19] py-1"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-2 w-full py-3 bg-[#0B0F19] text-white text-[14px] font-semibold rounded-lg"
              >
                Hire Me
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} className="min-h-screen flex flex-col justify-center pt-24 pb-20 px-6">
        <div className="max-w-[1100px] mx-auto w-full">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-[1fr_auto] gap-16 items-center"
          >
            {/* Left */}
            <div className="flex flex-col gap-7">
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EDEEF2] rounded-full text-[11px] font-mono font-semibold text-[#1A56DB] uppercase tracking-wider shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available for hire · Nairobi, Kenya
                </span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] text-[#0B0F19] leading-[1.1] font-normal">
                  I turn business data<br />
                  into <em className="not-italic font-normal" style={{
                    background: 'linear-gradient(135deg,#1A56DB,#6D28D9)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>decisions that pay.</em>
                </h1>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="text-[1.05rem] text-[#5A6272] leading-relaxed max-w-[560px]">
                  Data Scientist & ML Engineer specializing in <strong className="text-[#0B0F19] font-semibold">financial risk, customer retention, and predictive analytics</strong>. I don't just build models — I build solutions teams actually use, with results you can measure on a P&L.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('work')}
                  className="px-6 py-3 bg-[#0B0F19] text-white text-[14px] font-semibold rounded-xl hover:bg-[#1A56DB] transition-colors flex items-center gap-2"
                >
                  See My Work <FiArrowRight size={15} />
                </button>
                <a
                  href="mailto:godfreyimbindi@gmail.com"
                  className="px-6 py-3 bg-white text-[#0B0F19] text-[14px] font-semibold rounded-xl border border-[#EDEEF2] hover:border-[#0B0F19] transition-colors shadow-sm"
                >
                  Email Me
                </a>
              </motion.div>

              {/* Social row */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-1">
                <a href="https://github.com/GODFREY-PNG" target="_blank" rel="noopener noreferrer"
                  className="p-2 text-[#5A6272] hover:text-[#0B0F19] transition-colors">
                  <FiGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/godfrey-imbindi-adembesa-a55183354" target="_blank" rel="noopener noreferrer"
                  className="p-2 text-[#5A6272] hover:text-[#0B0F19] transition-colors">
                  <FiLinkedin size={18} />
                </a>
                <a href="mailto:godfreyimbindi@gmail.com"
                  className="p-2 text-[#5A6272] hover:text-[#0B0F19] transition-colors">
                  <FiMail size={18} />
                </a>
                <span className="w-px h-4 bg-[#EDEEF2]" />
                <a
                  href="https://www.credly.com/badges/50a7ff74-3473-4c65-8574-2d4480d2130c/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#B45309] hover:text-[#0B0F19] transition-colors"
                >
                  <FiAward size={14} /> IBM Certified
                </a>
              </motion.div>
            </div>

            {/* Right: photo + stat cards */}
            <motion.div variants={fadeUp} className="hidden lg:flex flex-col items-center gap-5">
              {/* Photo */}
              <div className="relative w-[220px] h-[220px] rounded-[24px] overflow-hidden border-2 border-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <Image src="/image.png" alt="Godfrey Imbindi Adembesa" fill className="object-cover" priority />
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-2 gap-2.5 w-full">
                {STATS.map(s => (
                  <div key={s.sub} className="bg-white rounded-xl p-3.5 border border-[#EDEEF2] shadow-sm text-center">
                    <p className="font-serif text-[1.4rem] text-[#0B0F19] leading-none mb-1">{s.value}</p>
                    <p className="text-[9.5px] font-mono text-[#9AA0AD] uppercase tracking-wide leading-tight">{s.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-16"
          >
            <button onClick={() => scrollTo('work')} className="flex flex-col items-center gap-1.5 text-[#9AA0AD] hover:text-[#3D4451] transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
              <FiChevronDown size={16} className="animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── PROOF BAR ── */}
      <section className="bg-[#0B0F19] py-8 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#ffffff18]">
            {STATS.map(s => (
              <div key={s.sub} className="bg-[#0B0F19] px-8 py-5 text-center">
                <p className="font-serif text-[2rem] text-white leading-none mb-1.5">{s.value}</p>
                <p className="text-[11px] text-[#9AA0AD] leading-snug">{s.label}</p>
                <p className="text-[10px] font-mono text-[#5A6272] uppercase tracking-wider mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="font-mono text-[10px] text-[#1A56DB] uppercase tracking-[2.5px] font-semibold mb-2">
                  — Selected Work
                </p>
                <h2 className="font-serif text-[2rem] text-[#0B0F19] font-normal leading-tight">
                  Problems solved.<br /><em>Results measured.</em>
                </h2>
              </div>
              <p className="text-[13.5px] text-[#5A6272] max-w-[380px] leading-relaxed">
                Every project below started with a real business pain — not a Kaggle dataset. Here's the problem, what I built, and what changed.
              </p>
            </motion.div>

            {/* Filter bar */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 border ${
                    activeFilter === f
                      ? 'bg-[#0B0F19] text-white border-[#0B0F19]'
                      : 'bg-white text-[#5A6272] border-[#EDEEF2] hover:border-[#9AA0AD]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Featured first */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-6"
          >
            {filtered.filter(p => p.featured).map(p => (
              <ProjectCard key={p.id} p={p} featured />
            ))}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.filter(p => !p.featured).map(p => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start"
          >
            {/* Left */}
            <div className="flex flex-col gap-6">
              <motion.div variants={fadeUp}>
                <p className="font-mono text-[10px] text-[#1A56DB] uppercase tracking-[2.5px] font-semibold mb-3">
                  — About Me
                </p>
                <h2 className="font-serif text-[2rem] text-[#0B0F19] font-normal leading-tight mb-5">
                  I bridge the gap between<br /><em>data and decisions.</em>
                </h2>
                <div className="flex flex-col gap-4 text-[14.5px] text-[#5A6272] leading-relaxed">
                  <p>
                    I'm a Data Scientist and ML Engineer with a background in <strong className="text-[#0B0F19] font-semibold">Medical Microbiology</strong> — which means I've been trained to think in hypotheses, rigorously validate results, and explain complex findings to non-specialists. That skill transfers directly to data science.
                  </p>
                  <p>
                    What separates me from a model-builder is that I focus on <strong className="text-[#0B0F19] font-semibold">business outcomes</strong>. Every project I deliver comes with clear documentation, ROI framing, and solutions your team can actually use — not notebooks that live in a git repo.
                  </p>
                  <p>
                    I specialize in <strong className="text-[#0B0F19] font-semibold">financial risk, customer analytics, and real-time forecasting</strong> — areas where the cost of bad decisions is highest and good models create the most value.
                  </p>
                </div>
              </motion.div>

              {/* Stat row */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { n: '5+', l: 'Industries served' },
                  { n: '10+', l: 'Projects delivered' },
                  { n: '24h', l: 'Response time' },
                ].map(s => (
                  <div key={s.l} className="bg-[#F6F7F9] rounded-xl p-4 text-center border border-[#EDEEF2]">
                    <p className="font-serif text-[1.7rem] text-[#0B0F19] leading-none mb-1">{s.n}</p>
                    <p className="text-[10px] font-mono text-[#9AA0AD] uppercase tracking-wide">{s.l}</p>
                  </div>
                ))}
              </motion.div>

              {/* Credly badge */}
              <motion.div variants={fadeUp}>
                <a
                  href="https://www.credly.com/badges/50a7ff74-3473-4c65-8574-2d4480d2130c/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#FEF3C7] text-[#B45309] rounded-xl text-[13px] font-semibold border border-[#FDE68A] hover:bg-[#FFFBEB] transition-colors"
                >
                  <FiAward size={16} />
                  IBM Data Science Professional Certificate
                  <FiExternalLink size={12} />
                </a>
              </motion.div>
            </div>

            {/* Right: capability tiles */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              {[
                {
                  title: 'I predict what will happen',
                  body: 'Bankruptcy, churn, cost spikes — I build models that give your teams weeks of lead time.',
                  icon: '📈',
                },
                {
                  title: 'I explain why it happens',
                  body: 'SHAP values and odds-ratio analysis that non-technical stakeholders can understand and trust.',
                  icon: '🔍',
                },
                {
                  title: 'I deploy it so teams use it',
                  body: 'FastAPI endpoints and Streamlit apps — not notebooks sitting on a laptop.',
                  icon: '🚀',
                },
                {
                  title: 'I measure the business impact',
                  body: 'Every project is framed in dollars saved, churn reduced, or ROI gained — not just accuracy scores.',
                  icon: '💰',
                },
              ].map((tile, i) => (
                <div
                  key={tile.title}
                  className={`bg-[#F6F7F9] rounded-xl p-5 border border-[#EDEEF2] ${i % 2 === 1 ? 'mt-5' : ''}`}
                >
                  <span className="text-2xl block mb-3">{tile.icon}</span>
                  <h4 className="font-semibold text-[#0B0F19] text-[13.5px] mb-1.5 leading-snug">{tile.title}</h4>
                  <p className="text-[12.5px] text-[#5A6272] leading-relaxed">{tile.body}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 px-6 bg-[#F6F7F9]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <p className="font-mono text-[10px] text-[#1A56DB] uppercase tracking-[2.5px] font-semibold mb-2">
                — Technical Skills
              </p>
              <h2 className="font-serif text-[2rem] text-[#0B0F19] font-normal">
                The full toolkit.
              </h2>
            </motion.div>

            {/* Tech icons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
              {TECH.map(t => (
                <div
                  key={t.name}
                  className="group flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-xl border border-[#EDEEF2] shadow-sm hover:border-[#0B0F19] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  <t.icon className="text-[18px] text-[#3D4451]" />
                  <span className="text-[12px] font-mono font-medium text-[#3D4451]">{t.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Skill areas */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {SKILLS.map((s, i) => (
                <motion.div
                  key={s.area}
                  variants={fadeUp}
                  className="bg-white rounded-[16px] p-6 border border-[#EDEEF2] shadow-sm"
                >
                  <p className="font-mono text-[10px] text-[#1A56DB] uppercase tracking-wider font-semibold mb-3">
                    0{i + 1}
                  </p>
                  <h3 className="font-semibold text-[#0B0F19] text-[14px] mb-4">{s.area}</h3>
                  <ul className="flex flex-col gap-2">
                    {s.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-[12.5px] text-[#5A6272]">
                        <span className="w-1 h-1 rounded-full bg-[#1A56DB] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 bg-[#0B0F19]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <p className="font-mono text-[10px] text-[#1A56DB] uppercase tracking-[2.5px] font-semibold mb-4">
                — Get In Touch
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-white font-normal leading-tight mb-4">
                You have a data problem.<br /><em>Let's fix it.</em>
              </h2>
              <p className="text-[#9AA0AD] text-[14.5px] leading-relaxed max-w-[480px] mx-auto mb-12">
                Whether you need to reduce risk, stop churn, or understand your customers better — I'll assess your situation honestly and tell you exactly what data science can and can't do for you.
              </p>
            </motion.div>

            {/* Contact cards */}
            <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                {
                  icon: FiMail,
                  label: 'Email',
                  value: 'godfreyimbindi@gmail.com',
                  href: 'mailto:godfreyimbindi@gmail.com',
                  sub: 'Replies within 24h',
                },
                {
                  icon: FiLinkedin,
                  label: 'LinkedIn',
                  value: 'Godfrey Imbindi',
                  href: 'https://www.linkedin.com/in/godfrey-imbindi-adembesa-a55183354',
                  sub: 'Connect professionally',
                },
                {
                  icon: FiGithub,
                  label: 'GitHub',
                  value: 'GODFREY-PNG',
                  href: 'https://github.com/GODFREY-PNG',
                  sub: 'See all my code',
                },
              ].map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group p-5 bg-white/[0.05] border border-white/10 rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 text-center"
                >
                  <c.icon className="text-white mx-auto mb-3" size={20} />
                  <p className="text-[10px] font-mono text-[#5A6272] uppercase tracking-wider mb-1">{c.label}</p>
                  <p className="text-[13px] font-semibold text-white mb-0.5 break-all">{c.value}</p>
                  <p className="text-[11px] text-[#5A6272]">{c.sub}</p>
                </a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="mailto:godfreyimbindi@gmail.com"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#1A56DB] text-white text-[14px] font-semibold rounded-xl hover:bg-[#1445b8] transition-colors shadow-[0_4px_20px_rgba(26,86,219,0.4)]"
              >
                <FiMail size={16} />
                Start a Conversation
              </a>
              <p className="text-[#5A6272] text-[11px] font-mono mt-4 uppercase tracking-widest">
                Free 30-min discovery call · No commitment
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0B0F19] border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-white text-[15px]">Godfrey Imbindi Adembesa</p>
            <p className="font-mono text-[10px] text-[#5A6272] uppercase tracking-wider mt-0.5">
              Data Scientist · ML Engineer · Nairobi, Kenya
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/GODFREY-PNG" target="_blank" rel="noopener noreferrer"
              className="text-[#5A6272] hover:text-white transition-colors">
              <FiGithub size={17} />
            </a>
            <a href="https://www.linkedin.com/in/godfrey-imbindi-adembesa-a55183354" target="_blank" rel="noopener noreferrer"
              className="text-[#5A6272] hover:text-white transition-colors">
              <FiLinkedin size={17} />
            </a>
            <a href="mailto:godfreyimbindi@gmail.com"
              className="text-[#5A6272] hover:text-white transition-colors">
              <FiMail size={17} />
            </a>
          </div>
          <p className="text-[11px] text-[#5A6272] font-mono">
            © {year} · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
