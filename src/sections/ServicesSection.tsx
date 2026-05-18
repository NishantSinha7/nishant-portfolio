import React from 'react';
import FadeIn from '../components/FadeIn';

const SKILLS = [
  {
    number: '01',
    name: 'iOS Development',
    description:
      'SwiftUI, Firebase, SceneKit, Xcode. Shipped production-ready apps on real devices in a professional team environment at Infosys.',
  },
  {
    number: '02',
    name: 'AI & Backend',
    description:
      'Python, FastAPI, Claude API. Built and deployed live AI-powered tools with voice interaction, adaptive logic, and structured scoring — running in production.',
  },
  {
    number: '03',
    name: 'Databases & Auth',
    description:
      'Firebase Firestore and Firebase Auth. Real-time data sync, secure login flows, and persistent user state across multiple iOS devices.',
  },
  {
    number: '04',
    name: 'Dev Workflow',
    description:
      'Git, GitHub, Jira, Agile/Scrum. Managed sprints, resolved 10+ issues, and shipped features on schedule in a structured professional team.',
  },
  {
    number: '05',
    name: 'Prompt Engineering',
    description:
      'Claude API, Generative AI, Cursor. Building with LLMs as a core development tool — not an afterthought. AI-assisted dev is my default workflow.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="font-black uppercase text-center text-[#0C0C0C]
            mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      {/* Skills list */}
      <div className="max-w-5xl mx-auto">
        {SKILLS.map((skill, i) => (
          <FadeIn key={skill.number} delay={i * 0.1} y={30} duration={0.7}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              {/* Number */}
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {skill.number}
              </span>

              {/* Name + description */}
              <div className="flex flex-col justify-center gap-2 pt-2">
                <span
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {skill.name}
                </span>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
