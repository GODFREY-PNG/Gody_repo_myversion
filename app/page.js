'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll } from 'framer-motion'
import { 
  FiGithub, FiLinkedin, FiMail, FiExternalLink, 
  FiChevronRight, FiAward, FiTrendingUp, 
  FiUsers, FiBarChart2, FiActivity, FiShield, FiTarget,
  FiMenu, FiX, FiDatabase, FiCpu
} from 'react-icons/fi'
import { 
  SiPython, SiPandas, SiNumpy, SiScikitlearn, 
  SiStreamlit, SiFastapi, SiMongodb, SiTableau,
  SiPlotly, SiTensorflow
} from 'react-icons/si'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentYear, setCurrentYear] = useState('')
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  const navItems = ['Home', 'Projects', 'About', 'Contact']

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const techStack = [
    { icon: SiPython, name: 'Python' },
    { icon: SiPandas, name: 'Pandas' },
    { icon: SiNumpy, name: 'NumPy' },
    { icon: SiScikitlearn, name: 'Scikit-learn' },
    { icon: SiTensorflow, name: 'TensorFlow' },
    { icon: SiFastapi, name: 'FastAPI' },
    { icon: SiStreamlit, name: 'Streamlit' },
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiTableau, name: 'Tableau' },
    { icon: SiPlotly, name: 'Plotly' }
  ]

  const skillCategories = [
    {
      title: 'Machine Learning',
      skills: ['Classification', 'Regression', 'Clustering', 'PCA', 'Feature Engineering', 'Model Evaluation'],
      icon: FiCpu
    },
    {
      title: 'Data Analysis',
      skills: ['Statistical Modeling', 'Time Series', 'A/B Testing', 'Data Cleaning', 'Exploratory Analysis'],
      icon: FiBarChart2
    },
    {
      title: 'Data Engineering',
      skills: ['SQL/NoSQL', 'Data Pipelines', 'ETL', 'Data Validation', 'Feature Stores'],
      icon: FiDatabase
    },
    {
      title: 'Deployment',
      skills: ['Model Deployment', 'API Development', 'Streamlit Apps', 'Version Control', 'Documentation'],
      icon: FiActivity
    }
  ]

  return (
    <main className="relative overflow-x-hidden bg-white dark:bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-xl font-mono font-bold text-black dark:text-white"
            >
              Adembesa<span className="text-gray-500 dark:text-gray-400">.ds</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-black dark:text-white"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-full text-sm font-mono mb-6">
                <FiActivity className="mr-2" />
                Data Scientist | ML Engineer
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-black dark:text-white">
                Data Scientist &<br />
                <span className="text-gray-600 dark:text-gray-400">Machine Learning Engineer</span>
              </h1>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Specializing in predictive modeling, financial risk analytics, customer behavior analysis, 
                and AI-driven solutions. I transform complex data into actionable business insights.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 flex items-center"
                >
                  View Projects
                  <FiChevronRight className="ml-2" />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="px-8 py-4 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 flex items-center"
                >
                  Contact Me
                </motion.a>
              </div>

              <div className="mt-12">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-mono">Tech Stack</p>
                <div className="flex flex-wrap gap-4">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="group relative"
                    >
                      <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                        <tech.icon className="text-2xl text-black dark:text-white" />
                      </div>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-700 animate-ping opacity-75"></div>
                <div className="absolute inset-2 rounded-full border-2 border-gray-400 dark:border-gray-600 animate-ping animation-delay-200 opacity-50"></div>
                <div className="absolute inset-4 rounded-full border-2 border-gray-500 dark:border-gray-500 animate-ping animation-delay-400 opacity-25"></div>
                
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                  <Image
                    src="/image.png"
                    alt="Adembesa Godfrey"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Technical Expertise
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Core competencies in data science and machine learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <category.icon className="text-2xl text-black dark:text-white" />
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                  {category.title}
                </h3>
                
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                      <span className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Data Science Projects
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world machine learning solutions in finance, customer analytics, and risk assessment
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/italian banckruptcy confuison matrix.png"
                  alt="Financial Risk Assessment Confusion Matrix"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  Corporate Financial Risk Assessment
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  ML model achieving 85% accuracy in predicting bankruptcy risk. Optimized for high recall to minimize credit exposure and enable proactive risk management.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Scikit-learn</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Pandas</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">RandomForest</span>
                </div>
                
                <motion.a
                  whileHover={{ x: 2 }}
                  href="https://github.com/GODFREY-PNG/ITALIAN-BANKRUPTCY-PREDICTION"
                  target="_blank"
                  className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 font-medium text-sm group"
                >
                  View on GitHub
                  <FiExternalLink className="ml-2" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/Customer_segmentation.png"
                  alt="Customer Segmentation Visualization"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  Customer Intelligence & Segmentation
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  K-Means clustering with PCA to identify distinct customer segments for targeted marketing campaigns. Achieved Silhouette score of 0.62.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">K-Means</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">PCA</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Plotly</span>
                </div>
                
                <motion.a
                  whileHover={{ x: 2 }}
                  href="https://github.com/GODFREY-PNG/CUSTOMER_SEGMENTATION_PROJECT"
                  target="_blank"
                  className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 font-medium text-sm group"
                >
                  View on GitHub
                  <FiExternalLink className="ml-2" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/Apple daily returns vs 2SD conditional volatility.png"
                  alt="Stock Volatility Analysis"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  Market Volatility Forecasting
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  GARCH-based volatility modeling with FastAPI backend. Real-time market risk assessment using historical price data.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">FastAPI</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">GARCH</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">AlphaVantage</span>
                </div>
                
                <motion.a
                  whileHover={{ x: 2 }}
                  href="https://github.com/GODFREY-PNG/STOCKS-VOLATILITY-FORECAST"
                  target="_blank"
                  className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 font-medium text-sm group"
                >
                  View on GitHub
                  <FiExternalLink className="ml-2" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/ODDS RATIO HORIZONTAL BAR TELCOCHURN.png"
                  alt="Customer Churn Analysis"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  Customer Churn Prediction
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  Logistic regression model identifying at-risk customers with 0.89 ROC-AUC. Features odds ratio analysis for interpretable retention strategies.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Logistic Regression</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">SMOTE</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">GridSearch</span>
                </div>
                
                <motion.a
                  whileHover={{ x: 2 }}
                  href="https://github.com/GODFREY-PNG/TELCO_CHURN_PROJECT"
                  target="_blank"
                  className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 font-medium text-sm group"
                >
                  View on GitHub
                  <FiExternalLink className="ml-2" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden lg:col-span-2"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-48 md:h-full bg-gray-100 dark:bg-gray-900">
                  <Image
                    src="/app.png"
                    alt="Insurance Cost Prediction App"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    Insurance Risk Evaluation App
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    Interactive Streamlit application for predicting insurance costs using RandomForest regression. Deployed on cloud with real-time predictions.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Python</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Streamlit</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">RandomForest</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs font-mono text-black dark:text-white rounded">Scikit-learn</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://insurance-cost-predictor-j8my5uinh8d2eyrr32pltd.streamlit.app/"
                      target="_blank"
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors inline-flex items-center"
                    >
                      Live Demo
                      <FiExternalLink className="ml-2" />
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://github.com/GODFREY-PNG/insurance-cost-predictor"
                      target="_blank"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors inline-flex items-center"
                    >
                      GitHub
                      <FiGithub className="ml-2" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
                About Me
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  I am a professional <span className="font-semibold text-black dark:text-white">Data Scientist</span> and 
                  <span className="font-semibold text-black dark:text-white"> Machine Learning Engineer</span> with a 
                  solid academic background in Medical Microbiology. I transform raw data into actionable insights, 
                  predictive models, and intelligent solutions.
                </p>
                
                <p className="text-lg leading-relaxed">
                  My work specializes in <span className="font-semibold text-black dark:text-white">healthcare analytics, 
                  financial risk modeling, customer behavior analysis, and predictive maintenance</span>. 
                  I am passionate about solving complex business problems using data-driven approaches.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-center">
                  <div className="text-3xl font-bold text-black dark:text-white mb-2">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-center">
                  <div className="text-3xl font-bold text-black dark:text-white mb-2">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-center">
                  <div className="text-3xl font-bold text-black dark:text-white mb-2">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clients</div>
                </div>
              </div>
              
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.credly.com/badges/50a7ff74-3473-4c65-8574-2d4480d2130c/public_url"
                target="_blank"
                className="inline-flex items-center mt-8 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <FiAward className="mr-2" />
                View Credly Badge
                <FiExternalLink className="ml-2" />
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  <FiDatabase className="text-2xl text-black dark:text-white mb-3" />
                  <h3 className="font-bold text-black dark:text-white mb-1">Data Processing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ETL pipelines & feature engineering</p>
                </div>
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg mt-8">
                  <FiCpu className="text-2xl text-black dark:text-white mb-3" />
                  <h3 className="font-bold text-black dark:text-white mb-1">Model Development</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Training, tuning & validation</p>
                </div>
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  <FiBarChart2 className="text-2xl text-black dark:text-white mb-3" />
                  <h3 className="font-bold text-black dark:text-white mb-1">Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Statistical analysis & visualization</p>
                </div>
                <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg mt-8">
                  <FiActivity className="text-2xl text-black dark:text-white mb-3" />
                  <h3 className="font-bold text-black dark:text-white mb-1">Deployment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">API development & cloud deployment</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              Interested in collaborating on data science projects? Let's discuss your needs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:godfreyimbindi@gmail.com"
                className="group p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <FiMail className="text-2xl text-black dark:text-white mx-auto mb-3" />
                <h3 className="font-bold text-black dark:text-white mb-1">Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-all">godfreyimbindi@gmail.com</p>
              </motion.a>
              
              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.linkedin.com/in/godfrey-imbindi-adembesa-a55183354"
                target="_blank"
                className="group p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <FiLinkedin className="text-2xl text-black dark:text-white mx-auto mb-3" />
                <h3 className="font-bold text-black dark:text-white mb-1">LinkedIn</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect professionally</p>
              </motion.a>
              
              <motion.a
                whileHover={{ y: -2 }}
                href="https://wa.me/254707516308"
                target="_blank"
                className="group p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <FiActivity className="text-2xl text-black dark:text-white mx-auto mb-3" />
                <h3 className="font-bold text-black dark:text-white mb-1">WhatsApp</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">+254707516308</p>
              </motion.a>
            </div>
            
            <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">Quick Response</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I typically respond within 24 hours. Let's discuss how I can help with your data challenges.
              </p>
              <div className="flex justify-center space-x-6">
                <a href="https://github.com/GODFREY-PNG" target="_blank" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                  <FiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/godfrey-imbindi-adembesa-a55183354" target="_blank" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                  <FiLinkedin size={20} />
                </a>
                <a href="mailto:godfreyimbindi@gmail.com" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                  <FiMail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-mono font-bold text-black dark:text-white">Adembesa Godfrey Imbindi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Data Scientist & Machine Learning Engineer</p>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>© {currentYear} — All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
