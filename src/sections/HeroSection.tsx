import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';

const NAV_LINKS: { label: string; id: string }[] = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const BLUE = '#A8C8E8';
const BAR_DURATIONS = [1800, 2200, 1500, 2500, 2000];
const TICK = 30;

const HeroSection: React.FC = () => {
  const [scanStarted, setScanStarted] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [scanLineGone, setScanLineGone] = useState(false);
  const [scanFaded, setScanFaded] = useState(false);
  const [scanTextSwapped, setScanTextSwapped] = useState(false);
  const [scanPercent, setScanPercent] = useState(0);
  const [barPercents, setBarPercents] = useState<number[]>([0, 0, 0, 0, 0]);
  const barIntervals = useRef<ReturnType<typeof setInterval>[]>([]);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  // Trigger scan on first scroll past 30px
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 30 && !scanStarted) {
        setScanStarted(true);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [scanStarted]);

  // After scan starts: timers for all state transitions
  useEffect(() => {
    if (!scanStarted) return;
    const lineTimer   = setTimeout(() => setScanLineGone(true),    2600);
    const doneTimer   = setTimeout(() => setScanDone(true),        3200);
    const swapTimer   = setTimeout(() => setScanTextSwapped(true), 4600);
    const fadeTimer   = setTimeout(() => setScanFaded(true),       6000);
    return () => {
      clearTimeout(lineTimer);
      clearTimeout(doneTimer);
      clearTimeout(swapTimer);
      clearTimeout(fadeTimer);
    };
  }, [scanStarted]);

  // Percentage counter
  useEffect(() => {
    if (!scanStarted) return;
    setScanPercent(0);
    const interval = setInterval(() => {
      setScanPercent((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [scanStarted]);

  // Equalizer bars — 5 independent counters
  useEffect(() => {
    if (!scanStarted) return;
    barIntervals.current.forEach(clearInterval);
    barIntervals.current = [];
    setBarPercents([0, 0, 0, 0, 0]);
    BAR_DURATIONS.forEach((duration, i) => {
      const increment = 100 / (duration / TICK);
      const id = setInterval(() => {
        setBarPercents((prev) => {
          const next = [...prev];
          if (next[i] >= 100) { clearInterval(id); next[i] = 100; }
          else { next[i] = Math.min(next[i] + increment, 100); }
          return next;
        });
      }, TICK);
      barIntervals.current.push(id);
    });
    return () => barIntervals.current.forEach(clearInterval);
  }, [scanStarted]);

  // Reset bars after fade completes
  useEffect(() => {
    if (!scanFaded) return;
    barIntervals.current.forEach(clearInterval);
    barIntervals.current = [];
    const resetTimer = setTimeout(() => setBarPercents([0, 0, 0, 0, 0]), 1600);
    return () => clearTimeout(resetTimer);
  }, [scanFaded]);

  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} duration={0.7}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 relative z-50">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider
                text-sm md:text-lg lg:text-[1.4rem]
                transition-opacity duration-200 hover:opacity-70"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {label}
            </button>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="w-full overflow-visible">
        <FadeIn delay={0.15} y={40} duration={0.7}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full
              mt-6 sm:mt-4 md:-mt-5"
            style={{ fontSize: '14.1vw' }}
          >
            Hi, I&apos;m Nishant
          </h1>
        </FadeIn>
      </div>

      {/* Portrait + scan elements inside Magnet */}
      <FadeIn
        delay={0.6}
        y={30}
        duration={0.7}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="pointer-events-auto"
        >
          <div style={{ position: 'relative', display: 'inline-block', overflow: 'visible' }}>
            {/* Avatar */}
            <img
              src="/nishant-avatar.png"
              alt="Nishant portrait"
              className="block mx-auto object-contain"
              loading="eager"
              decoding="sync"
              onLoad={() => setAvatarLoaded(true)}
              style={{
                height: 'clamp(500px, 88vh, 980px)',
                width: 'auto',
                opacity: avatarLoaded ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            />

            {/* Scan line — one-shot sweep */}
            <div className="hidden sm:block">
            {!scanLineGone && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: '20%',
                  width: '60%',
                  height: 5,
                  background: BLUE,
                  boxShadow: `0 0 6px rgba(168,200,232,0.8), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)`,
                  top: '5%',
                  pointerEvents: 'none',
                }}
                initial={{ opacity: 0 }}
                animate={scanStarted ? { top: ['5%', '95%'], opacity: [0, 1, 1, 0] } : { top: '5%', opacity: 0 }}
                transition={{ duration: 2.5, ease: 'linear', times: [0, 0.05, 0.9, 1] }}
              />
            )}
            </div>

            {/* Equalizer bars */}
            <div className="hidden sm:block">
            <motion.div
              style={{
                position: 'absolute',
                top: '48%',
                left: '2%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                pointerEvents: 'none',
              }}
              animate={{ opacity: scanFaded ? 0 : (scanStarted ? 1 : 0) }}
              transition={{ duration: scanFaded ? 1.5 : 0.3, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                {barPercents.map((val, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', height: '70px', justifyContent: 'flex-end' }}
                  >
                    <span style={{ fontFamily: 'Kanit, sans-serif', fontSize: '9px', fontWeight: 700, color: BLUE, textShadow: `0 0 8px rgba(168,200,232,0.6), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)`, letterSpacing: '1px' }}>
                      {Math.round(val)}%
                    </span>
                    <motion.div
                      style={{ width: '10px', borderRadius: '4px', background: `linear-gradient(to top, ${BLUE}, rgba(168,200,232,0.4))`, boxShadow: `0 0 6px rgba(168,200,232,0.8), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)` }}
                      animate={{ height: `${val * 0.7}px` }}
                      transition={{ duration: 0.1, ease: 'linear' }}
                    />
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ opacity: scanFaded ? 0 : (scanStarted ? 1 : 0) }}
                transition={{ duration: scanFaded ? 1.5 : 0.3 }}
                style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '3px', color: '#A8C8E8', textShadow: '0 0 8px rgba(168,200,232,0.6), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)', marginTop: '6px', textAlign: 'center', width: '100%' }}
              >
                BIOMETRIC SCAN
              </motion.div>
            </motion.div>
            </div>

            {/* Percentage counter */}
            <div className="hidden sm:block">
            <motion.div
              style={{ position: 'absolute', top: '8%', right: '5%', fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '28px', color: BLUE, letterSpacing: '4px', textShadow: `0 0 8px rgba(168,200,232,0.6), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)`, pointerEvents: 'none' }}
              animate={{ opacity: scanFaded ? 0 : (scanStarted ? 1 : 0) }}
              transition={{ duration: scanFaded ? 1.5 : 0.3, ease: 'easeOut' }}
            >
              {scanPercent}%
            </motion.div>

            {/* Loading bar */}
            <motion.div
              style={{ position: 'absolute', top: 'calc(8% + 32px)', right: '5%', width: '120px', height: '5px', background: 'rgba(168,200,232,0.2)', borderRadius: '2px', overflow: 'hidden', pointerEvents: 'none' }}
              animate={{ opacity: scanFaded ? 0 : (scanStarted ? 1 : 0) }}
              transition={{ duration: scanFaded ? 1.5 : 0.3, ease: 'easeOut' }}
            >
              <motion.div
                style={{ height: '100%', background: BLUE, boxShadow: `0 0 6px rgba(168,200,232,0.8), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)`, borderRadius: '2px', width: '0%' }}
                animate={{ width: scanStarted ? `${scanPercent}%` : '0%' }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </motion.div>
            </div>

            {/* SCAN COMPLETE — fades out when scanTextSwapped */}
            <div className="hidden sm:block">
            <motion.div
              style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 35, opacity: 0 }}
              animate={{ opacity: scanFaded ? 0 : (scanTextSwapped ? 0 : (scanDone ? 1 : 0)) }}
              transition={{ duration: scanTextSwapped ? 0.3 : 0.8, ease: 'easeInOut' }}
            >
              <span
                className={scanDone ? 'scan-text-flicker' : ''}
                style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '28px', letterSpacing: '8px', color: BLUE, opacity: 1, textShadow: `0 0 8px rgba(168,200,232,0.6), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)` }}
              >
                SCAN COMPLETE
              </span>
            </motion.div>
            </div>

            {/* PROFILE LOADED · SCROLL TO EXPLORE — fades in when scanTextSwapped */}
            <div className="hidden sm:block">
            <motion.div
              style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 35, opacity: 0 }}
              animate={{ opacity: scanFaded ? 0 : (scanTextSwapped ? 1 : 0) }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <span style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 500, fontSize: '13px', letterSpacing: '4px', color: BLUE, textShadow: `0 0 8px rgba(168,200,232,0.6), 0 0 20px #D400C4, 0 0 40px rgba(212,0,196,0.4)` }}>
                PROFILE LOADED · SCROLL TO EXPLORE
              </span>
            </motion.div>
            </div>
          </div>
        </Magnet>
      </FadeIn>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
              max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            A builder driven by crafting smart apps and AI tools that leave a mark.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
