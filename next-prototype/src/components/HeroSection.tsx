'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ─── Time Context ───────────────────────────────────────────
type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 'morning';
  if (h >= 12 && h < 18) return 'day';
  if (h >= 18 && h < 22) return 'evening';
  return 'night';
}

const TIME_CONFIG: Record<TimeOfDay, {
  greeting: string;
  gradient: [string, string];
  overlayOpacity: number;
}> = {
  morning: {
    greeting: 'Добры ранак',
    gradient: ['#faf5ef', '#f0e6d4'],
    overlayOpacity: 0.12,
  },
  day: {
    greeting: 'Добры дзень',
    gradient: ['#faf9f6', '#eef1f5'],
    overlayOpacity: 0.08,
  },
  evening: {
    greeting: 'Добры вечар',
    gradient: ['#f5efe8', '#e8ddd0'],
    overlayOpacity: 0.18,
  },
  night: {
    greeting: 'Дабранач',
    gradient: ['#1d1d1f', '#0d0d0e'],
    overlayOpacity: 0.4,
  },
};

// ─── Generative Background ─────────────────────────────────
// In production: fetches from /api/image?context=hero-{timeOfDay}
// For prototype: uses CSS gradient + noise canvas

function NoiseCanvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 12; // very subtle
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity,
        mixBlendMode: 'multiply',
        imageRendering: 'pixelated',
      }}
    />
  );
}

// ─── Generative Image Crossfader ────────────────────────────
// Simulates the "Living Hero" effect
// In production: images come from SD API pre-generation pool

function GenerativeBackground({
  timeOfDay,
  images,
}: {
  timeOfDay: TimeOfDay;
  images: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  const config = TIME_CONFIG[timeOfDay];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${config.gradient[0]} 0%, ${config.gradient[1]} 100%)`,
        }}
      />

      {/* AI-generated images crossfade */}
      <AnimatePresence mode="sync">
        {images.length > 0 && (
          <motion.div
            key={currentIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              mixBlendMode: 'multiply',
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: config.overlayOpacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Film grain / texture */}
      <NoiseCanvas opacity={0.04} />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.06) 100%)',
        }}
      />
    </div>
  );
}

// ─── Text Reveal Animation ──────────────────────────────────

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3 + i * 0.12,
    },
  }),
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.8 + i * 0.15,
    },
  }),
};

function RevealLine({
  children,
  index,
  className = '',
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        custom={index}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────────

interface HeroSectionProps {
  generatedImages?: string[];
}

export default function HeroSection({ generatedImages = [] }: HeroSectionProps) {
  const timeOfDay = getTimeOfDay();
  const config = TIME_CONFIG[timeOfDay];
  const isNight = timeOfDay === 'night';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: text moves up slower than scroll
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─ Background Layer ─ */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <GenerativeBackground
          timeOfDay={timeOfDay}
          images={generatedImages}
        />
      </motion.div>

      {/* ─ Content ─ */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: textY, opacity: bgOpacity }}
      >
        {/* Eyebrow — time-aware greeting */}
        <motion.div
          custom={0}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          className={`
            font-mono text-[11px] tracking-[0.2em] uppercase mb-8
            ${isNight ? 'text-[#c9a96e]/60' : 'text-[#1d1d1f]/40'}
          `}
        >
          {config.greeting} &middot; aesthetic dentistry
        </motion.div>

        {/* Main Title — Large, breathing typography */}
        <h1 className="relative">
          <RevealLine index={0}>
            <span
              className={`
                block font-serif font-light tracking-[-0.04em] leading-[0.95]
                text-[clamp(48px,12vw,160px)]
                ${isNight ? 'text-[#faf9f6]' : 'text-[#1d1d1f]'}
              `}
              style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}
            >
              svyatlitsa
            </span>
          </RevealLine>
        </h1>

        {/* Divider line — animate width */}
        <motion.div
          className={`
            mx-auto my-8 h-px
            ${isNight ? 'bg-[#c9a96e]/30' : 'bg-[#1d1d1f]/10'}
          `}
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Subtitle */}
        <RevealLine index={1}>
          <p
            className={`
              text-[clamp(14px,2vw,21px)] font-light leading-relaxed max-w-md mx-auto
              ${isNight ? 'text-[#faf9f6]/50' : 'text-[#1d1d1f]/50'}
            `}
          >
            Прастора, дзе тэхналогіі сустракаюць чалавечнасць.
            <br />
            Стаматалогія новага пакалення.
          </p>
        </RevealLine>

        {/* CTA Buttons */}
        <motion.div
          custom={2}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 justify-center mt-12 flex-wrap"
        >
          <a
            href="#booking"
            className={`
              inline-flex items-center px-8 py-4 rounded-full text-[15px] font-medium
              transition-all duration-300 hover:scale-[1.02]
              ${isNight
                ? 'bg-[#c9a96e] text-[#1d1d1f] hover:bg-[#d4b477]'
                : 'bg-[#1d1d1f] text-[#faf9f6] hover:bg-[#2d2d2f]'
              }
            `}
          >
            Запісацца
          </a>
          <a
            href="#about"
            className={`
              inline-flex items-center px-8 py-4 rounded-full text-[15px] font-medium
              transition-all duration-300 hover:scale-[1.02]
              ${isNight
                ? 'text-[#faf9f6]/70 hover:text-[#faf9f6] hover:bg-white/5'
                : 'text-[#1d1d1f]/60 hover:text-[#1d1d1f] hover:bg-black/[0.03]'
              }
            `}
          >
            Даведацца больш
          </a>
        </motion.div>
      </motion.div>

      {/* ─ Scroll indicator ─ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className={`
            w-px h-12
            ${isNight ? 'bg-gradient-to-b from-transparent via-[#c9a96e]/30 to-transparent' : 'bg-gradient-to-b from-transparent via-[#1d1d1f]/15 to-transparent'}
          `}
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
