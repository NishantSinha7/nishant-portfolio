import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const EXPERIENCES = [
  {
    company: 'Infosys',
    role: 'iOS App Developer, Intern',
    duration: 'Jun 2024 – Jul 2024',
    description:
      'Designed and shipped a Learning Management System as a native iOS app using SwiftUI and Firebase Firestore, with user authentication, course catalog, and real-time progress tracking. Resolved 10+ sprint issues and delivered on schedule in an Agile/Scrum workflow using Jira.',
  },
  {
    company: 'Verzeo',
    role: 'Cybersecurity Intern (Virtual)',
    duration: 'Nov 2022 – Dec 2022',
    description:
      'Conducted penetration testing and vulnerability assessments, and gained hands-on experience with network security, hacking techniques, and real-world cyber defense strategies.',
  },
];

interface DividerLineProps {
  delay?: number;
}

const DividerLine: React.FC<DividerLineProps> = ({ delay = 0 }) => (
  <motion.div
    className="w-full h-px bg-[#D7E2EA]"
    style={{ originX: 0, opacity: 0.2 }}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
  />
);

interface ExperienceEntryProps {
  company: string;
  role: string;
  duration: string;
  description: string;
  entryDelay?: number;
}

const ExperienceEntry: React.FC<ExperienceEntryProps> = ({
  company,
  role,
  duration,
  description,
  entryDelay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const revealed = isHovered || isRevealed;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsRevealed((prev) => !prev)}
    >
      {/* DividerLine — untouched */}
      <DividerLine delay={entryDelay} />

      {/* Entry content row */}
      <div
        className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 md:gap-16 py-10 sm:py-12 md:py-14 px-4 -mx-4"
        style={{
          borderRadius: '16px',
          border: isHovered
            ? '1px solid rgba(215,226,234,0.07)'
            : '1px solid transparent',
          background: isHovered
            ? 'rgba(215,226,234,0.03)'
            : 'transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Left — company + duration, always sharp */}
        <motion.div
          className="sm:w-[38%] flex-shrink-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: entryDelay + 0.2, ease: 'easeOut' }}
        >
          <p
            className="text-[#D7E2EA] font-bold leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            {company}
          </p>
          <p
            className="text-[#D7E2EA] font-light mt-2"
            style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)', opacity: 0.4 }}
          >
            {duration}
          </p>
        </motion.div>

        {/* Right — role + description with blur reveal */}
        <motion.div
          className="sm:w-[62%]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: entryDelay + 0.4, ease: 'easeOut' }}
        >
          {/* Role — clears first */}
          <p
            className="text-[#D7E2EA] font-medium mb-3"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
              filter: revealed ? 'blur(0px)' : 'blur(4px)',
              opacity: revealed ? 1 : 0.35,
              transition: 'filter 1.1s ease, opacity 1s ease',
            }}
          >
            {role}
          </p>

          {/* Description — clears 0.15s after role */}
          <p
            className="text-[#D7E2EA] font-light leading-relaxed"
            style={{
              fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
              filter: revealed ? 'blur(0px)' : 'blur(4.5px)',
              opacity: revealed ? 0.7 : 0.3,
              transition: 'filter 1.4s ease 0.15s, opacity 1.3s ease 0.15s',
            }}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      {/* Section heading */}
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center
            mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      {/* Entries */}
      <div className="max-w-5xl mx-auto">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceEntry
            key={exp.company}
            company={exp.company}
            role={exp.role}
            duration={exp.duration}
            description={exp.description}
            entryDelay={i * 0.15}
          />
        ))}

        {/* Closing divider */}
        <DividerLine delay={0.3} />
      </div>
    </section>
  );
};

export default ExperienceSection;
