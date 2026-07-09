import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Briefcase,
  Code,
  BookOpen,
  Sparkles,
  User,
  ExternalLink,
  ChevronRight,
  Flame,
  Brain,
  Search,
  Database,
  Menu
} from 'lucide-react';

import TextType from './components/TextType/TextType';
import DecryptedText from './components/DecryptedText/DecryptedText';
import TrueFocus from './components/TrueFocus/TrueFocus';
import ScrollFloat from './components/ScrollFloat/ScrollFloat';
import RotatingText from './components/RotatingText/RotatingText';
import ScrollVelocity from './components/ScrollVelocity/ScrollVelocity';
import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu';
import Hyperspeed from './components/Hyperspeed/Hyperspeed';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const HYPERSPEED_OPTIONS = {
  onSpeedUp: () => { },
  onSlowDown: () => { },
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xff121a, 0xff3c43, 0xcc0006],  // Crimson red headlights
    rightCars: [0xffffff, 0xeeeeee, 0xcccccc], // White tail lights
    sticks: 0xff121a                           // Red side light sticks
  }
};

export default function App() {
  const containerRef = useRef(null);
  const [activeNav, setActiveNav] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  useEffect(() => {


    // 2. Scroll-linked Navbar Background effect
    ScrollTrigger.create({
      start: "top -30",
      onEnter: () => document.querySelector(".navbar")?.classList.add("navbar-scrolled"),
      onLeaveBack: () => document.querySelector(".navbar")?.classList.remove("navbar-scrolled")
    });

    // 3. 3D Section Transitions
    const allSections = gsap.utils.toArray('.scene-section');
    const animSections = gsap.utils.toArray('.scene-section:not(#hero)');

    animSections.forEach((section) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
          rotateX: 4
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=10%",
            end: "bottom top+=10%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    // Scroll tracker to activate navigation links
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const secPositions = allSections.map(sec => ({
        id: sec.id,
        top: sec.offsetTop,
        bottom: sec.offsetTop + sec.offsetHeight
      }));

      const active = secPositions.find(
        pos => scrollPos >= pos.top && scrollPos <= pos.bottom
      );
      if (active) {
        setActiveNav(active.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-app">
      <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />

      {/* Background Grids and Glows */}
      <div className="bg-grid"></div>
      <div className="bg-glow-red glow-1"></div>
      <div className="bg-glow-red glow-2"></div>
      <div className="bg-glow-red glow-3"></div>

      <div ref={containerRef} className="app-container">

        {/* Main Content Sections */}
        <main className="main-content">

          {/* Section 1: Hero Section */}
          <section id="hero" className="scene-section hero-layout">
            <div className="hero-info">
              <div className="hero-badge glass-panel">
                <Sparkles className="badge-spark" />
                <span>Available for AI/ML Roles</span>
              </div>

              <h1 className="hero-title">
                Hey, I'm <br />
                <TextType
                  text={["M Sai Vipul Chinmay"]}
                  typingSpeed={75}
                  pauseDuration={3000}
                  showCursor={true}
                  cursorCharacter="_"
                  cursorClassName="cursor-style"
                  className="typed-name"
                />
              </h1>

              <div className="hero-subtitle">
                <span>I specialize in</span>
                <RotatingText
                  texts={['LLM Architectures', 'RAG pipelines', 'Search Relevance', 'Information Retrieval', 'Machine Learning']}
                  mainClassName="rotating-badge"
                  staggerFrom={"first"}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.02}
                  splitLevelClassName="rotator-split"
                  transition={{ type: "spring", damping: 25, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </div>

              <p className="hero-description">
                A Computer Science undergraduate with hands-on experience designing and deploying scalable ML/NLP systems, building multi-agent AI architectures, and optimizing search ranking retrieval endpoints.
              </p>

              <div className="hero-buttons">
                <a href="#projects" className="glow-button">
                  <span>View Projects</span>
                  <ChevronRight className="btn-arrow" />
                </a>
                <a href="#about" className="contact-btn glass-panel">
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Immersive Glassmorphic Hero Card */}
            <div className="hero-card-wrapper">
              <div
                className="hero-card glass-panel"
              >
                {/* Card Red Accent Corner Gradients */}
                <div className="card-glow-1" />
                <div className="card-glow-2" />

                {/* Upper Section */}
                <div className="card-tilt-content">
                  <div className="card-header">
                    <div className="card-icon-container">
                      <Brain className="card-icon" />
                    </div>
                    <div className="card-header-text">
                      <span className="card-label">Role focus</span>
                      <span className="card-value">AI Engineer Intern</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-subsection">
                      <h3 className="card-section-title">Expertise</h3>
                      <div className="card-tags">
                        {['LLMs', 'RAG', 'Search Ranking', 'NLP'].map((s) => (
                          <span key={s} className="card-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="card-subsection">
                      <h3 className="card-section-title">Metrics Focus</h3>
                      <div className="card-metrics">
                        <div>• NDCG@10, MRR, Precision@K</div>
                        <div>• Sub-200ms P95 latency endpoints</div>
                        <div>• Factual consistency evaluation</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower Section (Contacts info with Scrambled Decrypt on hover) */}
                <div className="card-footer">
                  <div className="card-contacts">
                    <div className="contact-item">
                      <MapPin className="contact-icon" />
                      <DecryptedText text="Hyderabad, India" speed={80} characters="XYZ123!@#" className="decrypted-item" />
                    </div>
                    <div className="contact-item">
                      <Mail className="contact-icon" />
                      <DecryptedText text="m.sai.vipul.18@gmail.com" speed={50} characters="abcde#$%*" className="decrypted-item" />
                    </div>
                    <div className="contact-item">
                      <Phone className="contact-icon" />
                      <DecryptedText text="+91 83743 83285" speed={90} characters="9876543210" className="decrypted-item" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: About Section */}
          <div className="section-divider">
            <ScrollFloat
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              textClassName="divider-heading"
            >
              ABOUT ME
            </ScrollFloat>
          </div>

          <section id="about" className="scene-section about-layout">
            <div className="about-panel glass-panel">
              <div className="panel-side-line" />

              <div className="about-main">
                <div className="section-subtitle">
                  <User className="subtitle-icon" />
                  <h3 className="subtitle-text">Professional Summary</h3>
                </div>
                <p className="about-text">
                  I am a Computer Science undergraduate from Keshav Memorial Institute Of Technology (2022 - 2026), deeply passionate about large-scale ML model deployment, information retrieval, search relevance, and learning-to-rank.
                </p>
                <p className="about-text">
                  As an AI Engineer Intern at Krignal Technologies, I work alongside product and engineering teams to design and test LLM pipelines, multi-agent orchestrations, role-based onboarding services, and RAG systems. My goal is to build intelligent search architectures that retrieve contextually relevant results with sub-200ms latencies.
                </p>

                <div className="about-meta-grid">
                  <div className="meta-col">
                    <span className="meta-label">Education</span>
                    <span className="meta-val">B.Tech in Computer Science</span>
                    <span className="meta-sub">Keshav Memorial Institute (2022 - 2026)</span>
                  </div>
                  <div className="meta-col">
                    <span className="meta-label">Languages</span>
                    <span className="meta-val">English, Hindi, Telugu</span>
                  </div>
                </div>
              </div>

              <div className="about-sidebar">
                <div className="sidebar-group">
                  <h4 className="sidebar-title">
                    <Sparkles className="sidebar-icon" />
                    <span>Interests & Pursuits</span>
                  </h4>
                  <p className="sidebar-text">
                    Outside of AI research, I actively follow emerging AI trends, delve into blockchain technology, and enjoy listening to music, playing cricket, and watching movies.
                  </p>
                  <div className="sidebar-tags">
                    {['Music', 'Cricket', 'Movies', 'Blockchain', 'Emerging Tech'].map(interest => (
                      <span key={interest} className="sidebar-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sidebar-group">
                  <span className="meta-label">Connect on Social</span>
                  <div className="social-links">
                    <a
                      href="https://linkedin.com/in/vipulchinmay"
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn glass-panel"
                    >
                      <LinkedinIcon className="btn-icon" />
                      <span>LinkedIn</span>
                      <ExternalLink className="link-arrow" />
                    </a>
                    <a
                      href="https://github.com/vipulchinmay"
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn glass-panel"
                    >
                      <GithubIcon className="btn-icon" />
                      <span>GitHub</span>
                      <ExternalLink className="link-arrow" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Marquee Separator */}
          <div className="marquee-strip">
            <ScrollVelocity
              texts={['AI PIPELINES', 'RAG ARCHITECTURES', 'LEARNING TO RANK', 'SEARCH RELEVANCE', 'MULTI-AGENT DESIGN']}
              velocity={50}
              className="marquee-text"
            />
          </div>

          {/* Section 3: Skills Section */}
          <div className="section-divider">
            <ScrollFloat
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              textClassName="divider-heading"
            >
              TECHNICAL SKILLS
            </ScrollFloat>
          </div>

          <section id="skills" className="scene-section skills-layout">
            <div className="skills-grid">

              {/* Skill 1: Languages */}
              <div className="glow-border skills-card">
                <div className="skills-card-header">
                  <h3 className="skills-card-title">Languages</h3>
                  <Code className="skills-card-icon" />
                </div>
                <div className="skills-card-tags">
                  {['Java', 'Python', 'C++', 'JavaScript', 'SQL', 'C'].map((skill) => (
                    <span key={skill} className="skills-pill">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="skills-card-footer">Foundation Systems</div>
              </div>

              {/* Skill 2: ML & AI */}
              <div className="glow-border skills-card">
                <div className="skills-card-header">
                  <h3 className="skills-card-title">ML & AI</h3>
                  <Brain className="skills-card-icon" />
                </div>
                <div className="skills-card-tags">
                  {['LLM Fine-Tuning', 'RAG Architectures', 'Multi-Agent AI', 'LangChain', 'LangGraph', 'Transformers', 'LightGBM', 'Information Retrieval', 'Learning-to-Rank (LTR)', 'FAISS Vector Search', 'Semantic Search', 'A/B Testing'].map((skill) => (
                    <span key={skill} className="skills-pill">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="skills-card-footer">AI core expertise</div>
              </div>

              {/* Skill 3: Cloud & Infra */}
              <div className="glow-border skills-card">
                <div className="skills-card-header">
                  <h3 className="skills-card-title">Cloud & Infra</h3>
                  <Database className="skills-card-icon" />
                </div>
                <div className="skills-card-tags">
                  {['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis', 'Grafana'].map((skill) => (
                    <span key={skill} className="skills-pill">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="skills-card-footer">Scalable Deployment</div>
              </div>

              {/* Skill 4: Web & Backend */}
              <div className="glow-border skills-card">
                <div className="skills-card-header">
                  <h3 className="skills-card-title">Web & Backend</h3>
                  <Briefcase className="skills-card-icon" />
                </div>
                <div className="skills-card-tags">
                  {['Node.js', 'SpringBoot', 'React.js', 'REST API Design', 'MERN Stack', 'Express.js'].map((skill) => (
                    <span key={skill} className="skills-pill">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="skills-card-footer">Services architecture</div>
              </div>

            </div>
          </section>

          {/* Section 4: Experience Section */}
          <div className="section-divider">
            <ScrollFloat
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              textClassName="divider-heading"
            >
              WORK EXPERIENCE
            </ScrollFloat>
          </div>

          <section id="experience" className="scene-section experience-layout">
            <div className="timeline-container">

              <div className="timeline-item">
                <span className="timeline-node">
                  <Briefcase className="node-icon" />
                </span>

                <div className="timeline-content glass-panel">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">AI Engineer Intern</h3>
                      <span className="timeline-company">Krignal Technologies</span>
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-date">Nov 2025 – Present</span>
                      <span className="timeline-location">Hyderabad, India</span>
                    </div>
                  </div>

                  <div className="timeline-focus-area">
                    <span className="focus-label">Key Internship Mission</span>
                    <TrueFocus
                      sentence="Design Build Test AI Driven Backend Services"
                      blurAmount={3}
                      borderColor="#ff121a"
                      glowColor="rgba(255, 18, 26, 0.4)"
                      animationDuration={0.6}
                      pauseBetweenAnimations={1.5}
                    />
                  </div>

                  <ul className="timeline-list">
                    <li className="timeline-bullet">
                      <span className="bullet-point">•</span>
                      <span>Collaborating with AI and Product teams to design, build, and test AI-driven backend services powering content generation, tagging, access control, and real-time community insights.</span>
                    </li>
                    <li className="timeline-bullet">
                      <span className="bullet-point">•</span>
                      <span>Contributing to a multi-agent AI architecture with specialized agents for summarization, forecasting, opportunity detection, and insights; implementing custom dashboard integrations.</span>
                    </li>
                    <li className="timeline-bullet">
                      <span className="bullet-point">•</span>
                      <span>Assisting with user and access management, creating secure onboarding flows and role-based permissions for experts, members, and administrators.</span>
                    </li>
                    <li className="timeline-bullet">
                      <span className="bullet-point">•</span>
                      <span>Supporting evaluation and prompt experimentation, optimizing RAG pipelines and transformer outputs across diverse community contexts and user personas.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* Section 5: Projects Section */}
          <div className="section-divider">
            <ScrollFloat
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              textClassName="divider-heading"
            >
              PROJECTS
            </ScrollFloat>
          </div>

          <section id="projects" className="scene-section projects-layout">
            <div className="projects-list">

              {/* Project 1 */}
              <div className="project-card glass-panel">
                <div className="project-main">
                  <div>
                    <div className="project-meta-row">
                      <span className="project-badge">Retrieval & LTR</span>
                      <span className="project-year">2025</span>
                    </div>

                    <h3 className="project-title">Search Ranking Pipeline: BM25 + Neural Reranker</h3>
                    <p className="project-desc">
                      A two-stage retrieval and ranking engine designed to fetch candidates using BM25, score them using a cross-encoder, and sort them using a trained LightGBM Learning-to-Rank (LTR) model incorporating sentence-transformer features. Tested and evaluated using the Amazon ESCI dataset.
                    </p>

                    <div className="project-tech-tags">
                      {['LightGBM', 'FAISS', 'Sentence Transformers', 'FastAPI', 'AWS', 'Python'].map(tech => (
                        <span key={tech} className="project-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href="https://github.com/vipulchinmay/search-ranking"
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn"
                      >
                        <GithubIcon className="link-icon" />
                        <span>Repository</span>
                        <ExternalLink className="link-arrow" />
                      </a>
                    </div>
                  </div>

                  <div className="project-stats">
                    <span className="stat-highlight">12% NDCG@10 Improvement</span>
                    <span className="stat-separator">|</span>
                    <span className="stat-val">Sub-200ms P95 Latency</span>
                  </div>
                </div>

                <div className="project-visual">
                  <Search className="visual-icon" />
                  <span className="visual-title">BM25 + Neural Reranker</span>
                  <span className="visual-desc">Two-stage candidate selection & LightGBM sorting pipeline</span>
                </div>
              </div>

              {/* Project 2 */}
              <div className="project-card glass-panel">
                <div className="project-main">
                  <div>
                    <div className="project-meta-row">
                      <span className="project-badge">AI & RAG</span>
                      <span className="project-year">2024 - 2025</span>
                    </div>

                    <h3 className="project-title">Seekhan — RAG-powered AI Quiz Generator</h3>
                    <p className="project-desc">
                      Engineered a document ingestion and chunking pipeline with FAISS-indexed sentence embeddings. Built structured question generation (MCQ, True/False) from retrieved context, evaluating factual consistency using secondary validation loops.
                    </p>

                    <div className="project-tech-tags">
                      {['LangChain', 'FAISS', 'HuggingFace', 'React.js', 'Node.js', 'Express'].map(tech => (
                        <span key={tech} className="project-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href="https://github.com/spentuker/projectseekhan"
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn"
                      >
                        <GithubIcon className="link-icon" />
                        <span>Repository</span>
                        <ExternalLink className="link-arrow" />
                      </a>
                    </div>
                  </div>

                  <div className="project-stats">
                    <span className="stat-highlight">FAISS Indexing</span>
                    <span className="stat-separator">|</span>
                    <span className="stat-val">Factual Consistency Checks</span>
                  </div>
                </div>

                <div className="project-visual">
                  <Brain className="visual-icon" />
                  <span className="visual-title">RAG AI Quiz Gen</span>
                  <span className="visual-desc">Semantic search & verified structural quiz outputs</span>
                </div>
              </div>

              {/* Project 3 */}
              <div className="project-card glass-panel">
                <div className="project-main">
                  <div>
                    <div className="project-meta-row">
                      <span className="project-badge">Full-Stack & NLP</span>
                      <span className="project-year">2024</span>
                    </div>

                    <h3 className="project-title">AushadX — Multilingual Medicine Assistance</h3>
                    <p className="project-desc">
                      A full-stack MERN application incorporating an Easy-OCR processing pipeline to parse medicine details from uploaded prescription images. Powered by a fine-tuned medical QA model with support for 5+ local languages.
                    </p>

                    <div className="project-tech-tags">
                      {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Easy-OCR', 'Docker', 'AWS'].map(tech => (
                        <span key={tech} className="project-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href="https://github.com/vipulchinmay/projectaushadX"
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn"
                      >
                        <GithubIcon className="link-icon" />
                        <span>Repository</span>
                        <ExternalLink className="link-arrow" />
                      </a>
                    </div>
                  </div>

                  <div className="project-stats">
                    <span className="stat-highlight">5+ Languages NLP</span>
                    <span className="stat-separator">|</span>
                    <span className="stat-val">OCR Extraction pipeline</span>
                  </div>
                </div>

                <div className="project-visual">
                  <Database className="visual-icon" />
                  <span className="visual-title">AushadX MERN</span>
                  <span className="visual-desc">Easy-OCR prescription scanner & multilingual medicine advice</span>
                </div>
              </div>

            </div>
          </section>

          {/* Section 6: Contact Section */}
          <div className="section-divider">
            <ScrollFloat
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              textClassName="divider-heading"
            >
              GET IN TOUCH
            </ScrollFloat>
          </div>

          <section id="contact" className="scene-section contact-layout">
            <div className="contact-panel glass-panel">
              <div className="contact-info-column">
                <h3 className="contact-subtitle">Let's Connect</h3>
                <p className="contact-desc">
                  Whether you have an opportunity, a question, or just want to talk search relevance, learning-to-rank, or LLM pipelines—feel free to reach out!
                </p>

                <div className="contact-details-list">
                  <div className="contact-detail-card">
                    <Mail className="detail-icon" />
                    <div>
                      <span className="detail-label">Email</span>
                      <a href="mailto:m.sai.vipul.18@gmail.com" className="detail-value">
                        m.sai.vipul.18@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <Phone className="detail-icon" />
                    <div>
                      <span className="detail-label">Phone</span>
                      <a href="tel:+918374383285" className="detail-value">
                        +91 83743 83285
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <MapPin className="detail-icon" />
                    <div>
                      <span className="detail-label">Location</span>
                      <span className="detail-value">Hyderabad, India</span>
                    </div>
                  </div>
                </div>

                <div className="contact-socials-row">
                  <a
                    href="https://linkedin.com/in/vipulchinmay"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn glass-panel"
                  >
                    <LinkedinIcon className="btn-icon" />
                    <span>LinkedIn</span>
                    <ExternalLink className="link-arrow" />
                  </a>

                  <a
                    href="https://github.com/vipulchinmay"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn glass-panel"
                  >
                    <GithubIcon className="btn-icon" />
                    <span>GitHub</span>
                    <ExternalLink className="link-arrow" />
                  </a>
                </div>
              </div>

              {/* Form side */}
              <form className="contact-form-card" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" required placeholder="John Doe" className="form-input glass-panel" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" required placeholder="john@example.com" className="form-input glass-panel" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" id="subject" required placeholder="Collaboration Opportunity" className="form-input glass-panel" />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" required rows="5" placeholder="Hey Vipul, I'd love to chat about..." className="form-input form-textarea glass-panel" />
                </div>

                <button type="submit" className="glow-button submit-btn">
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </section>

        </main>
      </div>

      {/* Header / Navbar */}
      <header className="navbar glass-panel">
        <a href="#hero" className="nav-brand navbar-anim-item">
          <Flame className="brand-logo" />
          <span className="brand-name">
            VIPUL<span className="brand-accent">CHINMAY</span>
          </span>
        </a>

        <nav className="nav-links">
          {['about', 'skills', 'experience', 'projects', 'contact'].map((sectionId) => (
            <a
              key={sectionId}
              href={`#${sectionId}`}
              className={`nav-link navbar-anim-item ${activeNav === sectionId ? 'active' : ''}`}
            >
              {sectionId}
            </a>
          ))}
        </nav>

        <div className="nav-action">
          <a
            href="/VipulChinmay-Resume.pdf"
            download="VipulChinmay-Resume.pdf"
            className="glow-button navbar-anim-item header-resume-btn"
          >
            <Download className="btn-icon" />
            <span>RESUME PDF</span>
          </a>

          <button className="menu-toggle-btn navbar-anim-item" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Staggered Sidebar Menu for Mobile */}
      <StaggeredMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={[
          { label: 'About', id: 'about', href: '#about' },
          { label: 'Skills', id: 'skills', href: '#skills' },
          { label: 'Experience', id: 'experience', href: '#experience' },
          { label: 'Projects', id: 'projects', href: '#projects' },
          { label: 'Contact', id: 'contact', href: '#contact' }
        ]}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Footer */}
      <footer className="footer glass-panel">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <Flame className="brand-logo" />
            <span className="brand-name">VIPUL CHINMAY</span>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} M Sai Vipul Chinmay. Built with React, GSAP, & Framer Motion.
          </p>
        </div>

        <div className="footer-links">
          <a href="#about" className="footer-link">About</a>
          <a href="#skills" className="footer-link">Skills</a>
          <a href="#experience" className="footer-link">Experience</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
      </footer>
    </div>
  );
}
