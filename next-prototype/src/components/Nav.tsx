'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.72]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-6 md:px-10"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(250,249,246,${v})`),
        borderBottom: useTransform(borderOpacity, (v) => `0.5px solid rgba(0,0,0,${v})`),
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 no-underline">
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
          svyatlitsa
        </span>
        <span className="text-[9px] font-mono tracking-[0.06em] uppercase text-[#86868b]">
          aesthetic dentistry
        </span>
      </a>

      {/* Center links — desktop */}
      <div className="hidden md:flex items-center gap-0">
        {['Пра нас', 'Паслугі', 'Працэс', 'Запіс'].map((label) => (
          <a
            key={label}
            href={`#${label}`}
            className="px-5 py-3 text-[12px] text-[#1d1d1f]/80 no-underline transition-opacity hover:opacity-100 opacity-70"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <a
          href="https://labs67.com"
          className="text-[12px] text-[#86868b] no-underline transition-colors hover:text-[#1d1d1f]"
        >
          LABS67
        </a>
        <a
          href="#booking"
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[12px] font-medium no-underline transition-all hover:bg-[#2d2d2f]"
        >
          Запісацца
        </a>
      </div>
    </motion.nav>
  );
}
