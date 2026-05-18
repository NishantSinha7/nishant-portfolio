import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:nishantsinha7122002@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/NishantSinha7',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nishant-sinha-0a1130319',
    external: true,
  },
];

const BUTTON_DELAYS = [0.3, 0.45, 0.6];

const ContactSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center text-center
        px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16"
      style={{ background: '#0C0C0C', minHeight: '100vh', color: '#D7E2EA' }}
    >
      {/* Eyebrow */}
      <motion.p
        className="font-light uppercase tracking-[0.3em] mb-6"
        style={{ fontSize: '0.75rem', opacity: 0.4 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.4, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Available for opportunities
      </motion.p>

      {/* Heading line 1 */}
      {isMobile ? (
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.6rem, 8.5vw, 9.5rem)' }}
        >
          Open to work.
        </h2>
      ) : (
        <motion.h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.6rem, 8.5vw, 9.5rem)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Open to work.
        </motion.h2>
      )}

      {/* Heading line 2 */}
      {isMobile ? (
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-14 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(2.6rem, 8.5vw, 9.5rem)' }}
        >
          Let&apos;s talk.
        </h2>
      ) : (
        <motion.h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-14 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(2.6rem, 8.5vw, 9.5rem)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s talk.
        </motion.h2>
      )}

      {/* Three pill buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group inline-flex items-center justify-center gap-2
              font-medium uppercase tracking-widest rounded-full
              w-full md:w-auto
              px-8 py-4 text-base
              no-underline"
            style={{
              color: '#D7E2EA',
              border: '1px solid rgba(215,226,234,0.25)',
              background: 'transparent',
              transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: BUTTON_DELAYS[i], ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background =
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)';
              el.style.borderColor = 'transparent';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(215,226,234,0.25)';
            }}
          >
            {link.label}
            <ArrowUpRight size={16} />
          </motion.a>
        ))}
      </div>

      {/* Divider */}
      <motion.div
        className="w-full max-w-xl h-px mt-20 sm:mt-24 mb-8"
        style={{ background: 'rgba(215,226,234,0.12)', originX: 0.5 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
      />

      {/* Footer */}
      <motion.p
        className="font-light"
        style={{ fontSize: '0.72rem', opacity: 0.3 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        © 2025 Nishant Sinha
      </motion.p>
    </section>
  );
};

export default ContactSection;
