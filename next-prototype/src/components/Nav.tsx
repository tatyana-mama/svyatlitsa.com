'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const LANGS = ['BE','DE','EN','ES','FR','IT','JA','KO','PL','PT','RU','UK'] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [lang, setLang] = useState('BE');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('labs67lang');
    if (saved) setLang(saved.toUpperCase());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLang = (l: string) => {
    setLang(l);
    localStorage.setItem('labs67lang', l.toLowerCase());
    setLangOpen(false);
  };
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
        {/* Lang switcher */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="font-mono text-[10px] tracking-[0.1em] text-[#86868b] hover:text-[#1d1d1f] transition-colors bg-transparent border-none cursor-pointer px-1"
          >
            {lang}
          </button>
          {langOpen && (
            <div className="absolute top-full right-0 mt-1 bg-[#faf9f6]/95 backdrop-blur-xl border border-black/[0.06] rounded-lg shadow-lg py-1 min-w-[48px] z-50">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLang(l)}
                  className={`block w-full text-left px-3 py-1 font-mono text-[10px] tracking-[0.08em] transition-colors bg-transparent border-none cursor-pointer
                    ${l === lang ? 'text-[#c9a96e]' : 'text-[#1d1d1f]/60 hover:text-[#1d1d1f]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
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
