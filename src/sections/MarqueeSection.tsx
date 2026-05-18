import React, { useEffect, useRef, useState } from 'react';

const ROW1_GIFS = [
  '/gif-xcode.gif',
  '/gif-3d-sword.gif',
  '/gif-interview.gif',
  '/gif-releaf.gif',
];

const ROW2_GIFS = [
  '/gif-ebook.gif',
  '/gif-pantry.gif',
  '/gif-3d-minecraft.gif',
  '/gif-portfolio-v1.gif',
];

// Duplicate each row's items for seamless looping — 8 items per row
const row1 = [...ROW1_GIFS, ...ROW1_GIFS];
const row2 = [...ROW2_GIFS, ...ROW2_GIFS];

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Row 1 — moves right */}
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {row1.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`project preview ${i + 1}`}
            loading="lazy"
            className="rounded-2xl flex-shrink-0"
            style={{
              width: '420px',
              height: '270px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Row 2 — moves left */}
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {row2.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`project preview ${i + 5}`}
            loading="lazy"
            className="rounded-2xl flex-shrink-0"
            style={{
              width: '420px',
              height: '270px',
              objectFit: src.includes('portfolio-v1') ? 'contain' : 'cover',
              objectPosition: 'center',
              backgroundColor: src.includes('portfolio-v1') ? '#0C0C0C' : 'transparent',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
