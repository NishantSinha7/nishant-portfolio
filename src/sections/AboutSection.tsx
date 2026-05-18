import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const ABOUT_PARAGRAPHS = [
  "Most of my work lives at the intersection of logic and experience, whether that's an AI that conducts real interviews or a 3D environment that makes an app feel alive.",
  "I've moved across mobile, AI, and beyond. Not because I couldn't pick a lane, but because I'm more interested in solving problems than staying comfortable. I care less about knowing a technology and more about knowing what to do with it.",
  "Right now I'm focused on one thing: building. Fast, sharp, and better than the last time.",
];

interface WordEntry {
  word: string;
  paraIndex: number;
  wordIndexInPara: number;
  globalIndex: number;
}

const buildWordList = (): { entries: WordEntry[]; paraSplits: number[][] } => {
  const entries: WordEntry[] = [];
  const paraSplits: number[][] = [];
  let globalIndex = 0;

  ABOUT_PARAGRAPHS.forEach((para, paraIndex) => {
    const words = para.split(' ');
    const indices: number[] = [];
    words.forEach((word, wordIndexInPara) => {
      entries.push({ word, paraIndex, wordIndexInPara, globalIndex });
      indices.push(globalIndex);
      globalIndex++;
    });
    paraSplits.push(indices);
  });

  return { entries, paraSplits };
};

const { entries: WORD_ENTRIES, paraSplits: PARA_SPLITS } = buildWordList();
const TOTAL_WORDS = WORD_ENTRIES.length;

interface AnimatedWordProps {
  word: string;
  globalIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ word, globalIndex, scrollYProgress }) => {
  const start = (globalIndex - 1) / TOTAL_WORDS;
  const end = (globalIndex + 0.6) / TOTAL_WORDS;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  );
};

const ScrollRevealText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-6 max-w-[560px]"
    >
      {ABOUT_PARAGRAPHS.map((_, paraIndex) => (
        <p
          key={paraIndex}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        >
          {PARA_SPLITS[paraIndex].map((globalIndex) => (
            <AnimatedWord
              key={globalIndex}
              word={WORD_ENTRIES[globalIndex].word}
              globalIndex={globalIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
      ))}
    </div>
  );
};

const AboutSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center
        px-5 sm:px-8 md:px-10 py-20"
      style={{ background: '#0C0C0C', overflow: 'visible' }}
    >
      {/* Top-left: Shield */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[0%] sm:left-[2%] md:left-[4%] pointer-events-none"
      >
        <img
          src="/about-shield.png"
          alt="shield decoration"
          className="object-contain"
          style={{ height: 'clamp(90px, 15vw, 200px)', width: 'auto' }}
          loading="eager"
        />
      </FadeIn>

      {/* Bottom-left: Chip */}
      {isMobile ? (
        <div className="absolute bottom-[2%] left-[2%] pointer-events-none">
          <img
            src="/about-chip.png"
            alt="chip decoration"
            className="object-contain"
            style={{ height: 'clamp(90px, 15vw, 200px)', width: 'auto' }}
            loading="eager"
          />
        </div>
      ) : (
        <FadeIn
          delay={0.25}
          x={-80}
          y={0}
          duration={0.9}
          className="absolute bottom-[8%] left-[6%] md:left-[10%] pointer-events-none"
        >
          <img
            src="/about-chip.png"
            alt="chip decoration"
            className="object-contain"
            style={{ height: 'clamp(90px, 15vw, 200px)', width: 'auto' }}
            loading="eager"
          />
        </FadeIn>
      )}

      {/* Top-right: Swift */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[-8%] sm:right-[-3%] md:right-[-2%] pointer-events-none"
      >
        <img
          src="/about-swift.png"
          alt="swift decoration"
          className="object-contain"
          style={{ height: 'clamp(100px, 17vw, 220px)', width: 'auto' }}
          loading="eager"
        />
      </FadeIn>

      {/* Bottom-right: Braces */}
      {isMobile ? (
        <div className="absolute bottom-[2%] right-[2%] pointer-events-none">
          <img
            src="/about-braces.png"
            alt="braces decoration"
            className="object-contain"
            style={{ height: 'clamp(85px, 13vw, 180px)', width: 'auto' }}
            loading="eager"
          />
        </div>
      ) : (
        <FadeIn
          delay={0.3}
          x={80}
          y={0}
          duration={0.9}
          className="absolute bottom-[8%] right-[6%] md:right-[10%] pointer-events-none"
        >
          <img
            src="/about-braces.png"
            alt="braces decoration"
            className="object-contain"
            style={{ height: 'clamp(85px, 13vw, 180px)', width: 'auto' }}
            loading="eager"
          />
        </FadeIn>
      )}

      {/* Center content */}
      <div className="flex flex-col items-center text-center gap-10 sm:gap-14 md:gap-16 relative z-10">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.7}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Word-by-word scroll reveal + button */}
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <ScrollRevealText />
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
