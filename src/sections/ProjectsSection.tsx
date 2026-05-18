import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';

interface ImgStyle {
  objectFit: 'cover' | 'contain';
  objectPosition: string;
  backgroundColor?: string;
}

interface ProjectData {
  number: string;
  label: string;
  name: string;
  tech: string;
  description: string;
  img1: string;
  img2: string;
  img3: string;
  img1Style?: ImgStyle;
  img2Style?: ImgStyle;
  img3Style?: ImgStyle;
  liveUrl?: string;
  githubUrl: string;
}

const DEFAULT_IMG1: ImgStyle = { objectFit: 'cover', objectPosition: 'center center' };
const DEFAULT_IMG2: ImgStyle = { objectFit: 'cover', objectPosition: 'center center' };
const DEFAULT_IMG3: ImgStyle = { objectFit: 'cover', objectPosition: 'center center' };

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    label: 'Featured Project',
    name: 'AI Mock Interview Coach',
    tech: 'Python · FastAPI · Claude API · React',
    description:
      'An AI-powered mock interview platform with adaptive questioning, voice interaction, and structured scoring.',
    img1: '/project-interview-1.png',
    img2: '/project-interview-2.png',
    img3: '/project-interview-3.png',
    liveUrl: 'https://mock-interview-coach.onrender.com/',
    githubUrl: 'https://github.com/NishantSinha7/mock-interview-coach',
  },
  {
    number: '02',
    label: 'iOS Project',
    name: 'ReLeaf',
    tech: 'SwiftUI · Firebase · CoreML · Xcode',
    description:
      'A sustainability iOS app for tracking your carbon footprint with real-time data and personalized actions.',
    img1: '/project-releaf-1.png',
    img2: '/project-releaf-2.png',
    img3: '/project-releaf-3.png',
    img1Style: { objectFit: 'cover', objectPosition: 'center top' },
    img2Style: { objectFit: 'cover', objectPosition: 'center top' },
    img3Style: { objectFit: 'cover', objectPosition: 'center center' },
    githubUrl: 'https://github.com/NishantSinha7/Releaf',
  },
  {
    number: '03',
    label: 'Internship Project',
    name: 'LMS App — Infosys',
    tech: 'SwiftUI · Firebase Firestore · Firebase Auth · Jira',
    description:
      'A native iOS Learning Management System built and shipped during my Infosys internship using Agile/Scrum.',
    img1: '/project-lms-1.png',
    img2: '/project-lms-2.png',
    img3: '/project-lms-3.png',
    img1Style: { objectFit: 'cover', objectPosition: 'center top' },
    img2Style: { objectFit: 'cover', objectPosition: 'center top' },
    img3Style: { objectFit: 'cover', objectPosition: 'center center' },
    githubUrl: 'https://github.com/NishantSinha7/Infosys-LMS-iOS',
  },
];

const TOTAL_CARDS = PROJECTS.length;

// Shared pill button base
const pillBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  borderRadius: '9999px',
  fontFamily: 'inherit',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease, background 0.2s ease',
  fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
  padding: '10px 22px',
};

const LiveButton: React.FC<{ href: string }> = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      ...pillBase,
      background: 'transparent',
      color: '#D7E2EA',
      border: '1px solid rgba(215,226,234,0.4)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLAnchorElement;
      el.style.background = 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)';
      el.style.borderColor = 'transparent';
      el.style.color = '#fff';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLAnchorElement;
      el.style.background = 'transparent';
      el.style.borderColor = 'rgba(215,226,234,0.4)';
      el.style.color = '#D7E2EA';
    }}
  >
    Live Project
  </a>
);

const GhostButton: React.FC<{ href: string; label?: string }> = ({ href, label = 'GitHub' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      ...pillBase,
      background: 'transparent',
      color: '#D7E2EA',
      border: '2px solid #D7E2EA',
    }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(215,226,234,0.1)')}
    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'transparent')}
  >
    {label}
  </a>
);

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  containerProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, containerProgress }) => {
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;

  const scale = useTransform(
    containerProgress,
    [index / TOTAL_CARDS, 1],
    [1, targetScale]
  );

  const s1 = project.img1Style ?? DEFAULT_IMG1;
  const s2 = project.img2Style ?? DEFAULT_IMG2;
  const s3 = project.img3Style ?? DEFAULT_IMG3;

  return (
    <div
      className="h-[70vh] sm:h-[85vh] flex items-start justify-center"
      style={{ position: 'sticky', top: `${96 + index * 28}px` }}
    >
      <motion.div
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
          border-2 border-[#D7E2EA] bg-[#0C0C0C]
          p-4 sm:p-6 md:p-8"
        style={{ scale, transformOrigin: 'top center', willChange: 'transform' }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4 sm:mb-5 flex-wrap gap-3">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col justify-center pt-1 gap-0.5">
              <span
                className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-50"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.85rem)' }}
              >
                {project.label}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase tracking-wide leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 2.2rem)' }}
              >
                {project.name}
              </span>
              <span
                className="text-[#D7E2EA] font-light opacity-40 mt-0.5"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.85rem)' }}
              >
                {project.tech}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {project.liveUrl && <LiveButton href={project.liveUrl} />}
            <GhostButton href={project.githubUrl} />
          </div>
        </div>

        {/* Description */}
        <p
          className="text-[#D7E2EA] font-light opacity-50 mb-4 sm:mb-5"
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
        >
          {project.description}
        </p>

        {/* Image grid */}
        <div className="flex gap-3 sm:gap-4">
          {/* Left column — 40% */}
          <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
            <img
              src={project.img1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full rounded-[20px] sm:rounded-[28px]"
              style={{
                height: 'clamp(110px, 14vw, 200px)',
                objectFit: s1.objectFit,
                objectPosition: s1.objectPosition,
                backgroundColor: s1.backgroundColor ?? 'transparent',
              }}
            />
            <img
              src={project.img2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full rounded-[20px] sm:rounded-[28px]"
              style={{
                height: 'clamp(130px, 18vw, 280px)',
                objectFit: s2.objectFit,
                objectPosition: s2.objectPosition,
                backgroundColor: s2.backgroundColor ?? 'transparent',
              }}
            />
          </div>

          {/* Right column — 60% */}
          <div style={{ width: '60%' }}>
            <img
              src={project.img3}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="w-full h-full rounded-[20px] sm:rounded-[28px]"
              style={{
                minHeight: 'clamp(240px, 32vw, 490px)',
                objectFit: s3.objectFit,
                objectPosition: s3.objectPosition,
                backgroundColor: s3.backgroundColor ?? 'transparent',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-10
        px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-8 sm:pb-32"
    >
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef}>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
