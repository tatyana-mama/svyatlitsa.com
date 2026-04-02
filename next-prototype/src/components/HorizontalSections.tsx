'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Panel wrapper ──────────────────────────────────────────
function Panel({
  children,
  bg = '#faf9f6',
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      className="w-screen h-screen flex-shrink-0 flex items-center overflow-hidden"
      style={{ background: bg }}
    >
      <div className="w-full h-full flex items-center px-8 md:px-16 lg:px-24">
        {children}
      </div>
    </div>
  );
}

// ─── About ──────────────────────────────────────────────────
function AboutPanel() {
  return (
    <Panel>
      <div className="w-full max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-5">
          Пра нас
        </p>
        <h2 className="text-[clamp(28px,4.5vw,56px)] font-light tracking-[-0.03em] leading-[1.1] text-[#1d1d1f] mb-6">
          Не проста клініка.<br />
          <span className="text-[#c9a96e]">Прастора для жыцця.</span>
        </h2>
        <div className="w-12 h-px bg-[#1d1d1f]/10 mb-6" />
        <p className="text-[15px] font-light leading-[1.8] text-[#1d1d1f]/45 max-w-md">
          Святліца — гэта месца, дзе тэхналогіі невідочныя, але адчуваюцца.
          Кожная дэталь прадумана: ад святла да гуку, ад матэрыялаў да руху паветра.
        </p>
        <div className="flex gap-10 mt-10">
          <div>
            <div className="text-[28px] font-light text-[#c9a96e]">AI</div>
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#1d1d1f]/25 mt-1">Асістэнт</div>
          </div>
          <div>
            <div className="text-[28px] font-light text-[#c9a96e]">0ms</div>
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#1d1d1f]/25 mt-1">Latency</div>
          </div>
          <div>
            <div className="text-[28px] font-light text-[#c9a96e]">100%</div>
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#1d1d1f]/25 mt-1">Прыватнасць</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Services ───────────────────────────────────────────────
function ServicesPanel() {
  const services = [
    { num: '01', title: 'Вініры', desc: 'Ідэальная ўсмешка за адзін дзень. AI-кантроль якасці.' },
    { num: '02', title: 'Імплантацыя', desc: '3D-навігацыя, хірургічныя шаблоны.' },
    { num: '03', title: 'Артадонтыя', desc: 'Нябачныя элайнеры. AI-прагноз руху зубоў.' },
    { num: '04', title: 'Эстэтыка', desc: 'Адбельванне, digital smile design.' },
    { num: '05', title: 'Хірургія', desc: 'Мікраскоп, piezo, PRF. Дакладнасць.' },
    { num: '06', title: 'Тэрапія', desc: 'SCYRA.AI мониторыць кожны этап.' },
  ];

  return (
    <Panel bg="#f5f5f7">
      <div className="w-full max-w-4xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-5">
          Паслугі
        </p>
        <h2 className="text-[clamp(28px,4.5vw,48px)] font-light tracking-[-0.03em] leading-[1.1] text-[#1d1d1f] mb-10">
          Кожная паслуга —<br />
          <span className="text-[#c9a96e]">новы стандарт</span>
        </h2>
        <div className="grid grid-cols-3 gap-px bg-[#1d1d1f]/[0.06]">
          {services.map((s) => (
            <div key={s.num} className="bg-[#f5f5f7] p-5 hover:bg-white transition-colors duration-300 group">
              <div className="font-mono text-[9px] tracking-[0.15em] text-[#c9a96e]/50 mb-2 group-hover:text-[#c9a96e] transition-colors">
                {s.num}
              </div>
              <div className="text-[15px] font-medium text-[#1d1d1f] mb-1.5">{s.title}</div>
              <div className="text-[12px] font-light leading-[1.6] text-[#1d1d1f]/35 group-hover:text-[#1d1d1f]/55 transition-colors">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Process ────────────────────────────────────────────────
function ProcessPanel() {
  const steps = [
    { num: '01', title: 'Знаёмства', desc: 'AI стварае ваш лічбавы профіль.' },
    { num: '02', title: 'План', desc: 'Digital Smile Design. Вынік да пачатку.' },
    { num: '03', title: 'Лячэнне', desc: 'SCYRA.AI назірае ў рэальным часе.' },
    { num: '04', title: 'Клопат', desc: 'AI нагадае, адсочыць, параіць.' },
  ];

  return (
    <Panel>
      <div className="w-full max-w-3xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-5">
          Працэс
        </p>
        <h2 className="text-[clamp(28px,4.5vw,48px)] font-light tracking-[-0.03em] leading-[1.1] text-[#1d1d1f] mb-14">
          Чатыры крокі да<br />
          <span className="text-[#c9a96e]">вашай усмешкі</span>
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute top-4 left-[60%] w-[80%] h-px bg-[#c9a96e]/15" />
              )}
              <div className="text-[24px] font-light text-[#c9a96e]/30 mb-3">{step.num}</div>
              <div className="text-[15px] font-medium text-[#1d1d1f] mb-2">{step.title}</div>
              <div className="text-[12px] font-light leading-[1.7] text-[#1d1d1f]/35">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Booking ────────────────────────────────────────────────
function BookingPanel() {
  return (
    <Panel bg="#1d1d1f">
      <div className="w-full max-w-4xl mx-auto flex gap-12 items-start">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-5">
            Запіс
          </p>
          <h2 className="text-[clamp(28px,4.5vw,48px)] font-light tracking-[-0.03em] leading-[1.1] text-[#faf9f6] mb-6">
            Пачніце<br /><span className="text-[#c9a96e]">зараз</span>
          </h2>
          <div className="w-12 h-px bg-[#faf9f6]/10 mb-6" />
          <div className="space-y-4">
            {[
              { label: 'Тэлефон', value: '+48 571 719 800' },
              { label: 'Email', value: 'dental@labs67.com' },
              { label: 'Гадзіны', value: 'Пн–Пт 9:00–20:00' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-[#faf9f6]/10 flex items-center justify-center text-[#c9a96e] text-[11px]">→</div>
                <div>
                  <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-[#faf9f6]/25">{c.label}</div>
                  <div className="text-[14px] text-[#faf9f6]/70">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            {['LABS67', 'SCYRA.AI', 'Warsaw'].map((tag) => (
              <span key={tag} className="font-mono text-[8px] tracking-[0.08em] uppercase text-[#faf9f6]/15 border border-[#faf9f6]/8 rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-0 bg-[#faf9f6]/[0.04] border border-[#faf9f6]/[0.06] rounded-2xl p-7">
          <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#c9a96e] mb-5">
            Запіс на прыём
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#faf9f6]/25 mb-1.5">Імя</label>
              <input type="text" className="w-full bg-transparent border-b border-[#faf9f6]/10 text-[#faf9f6] text-[14px] pb-2 outline-none focus:border-[#c9a96e]/50 transition-colors placeholder:text-[#faf9f6]/12" placeholder="Як вас завуць?" />
            </div>
            <div>
              <label className="block text-[11px] text-[#faf9f6]/25 mb-1.5">Тэлефон</label>
              <input type="tel" className="w-full bg-transparent border-b border-[#faf9f6]/10 text-[#faf9f6] text-[14px] pb-2 outline-none focus:border-[#c9a96e]/50 transition-colors placeholder:text-[#faf9f6]/12" placeholder="+48 000 000 000" />
            </div>
            <div>
              <label className="block text-[11px] text-[#faf9f6]/25 mb-1.5">Паслуга</label>
              <select className="w-full bg-transparent border-b border-[#faf9f6]/10 text-[#faf9f6]/40 text-[14px] pb-2 outline-none focus:border-[#c9a96e]/50 transition-colors">
                <option value="" className="bg-[#1d1d1f]">Абярыце</option>
                <option value="v" className="bg-[#1d1d1f]">Вініры</option>
                <option value="i" className="bg-[#1d1d1f]">Імплантацыя</option>
                <option value="o" className="bg-[#1d1d1f]">Артадонтыя</option>
                <option value="e" className="bg-[#1d1d1f]">Эстэтыка</option>
                <option value="t" className="bg-[#1d1d1f]">Тэрапія</option>
              </select>
            </div>
            <button className="w-full mt-4 py-3.5 rounded-full bg-[#c9a96e] text-[#1d1d1f] text-[14px] font-medium hover:bg-[#d4b477] transition-colors">
              Адправіць
            </button>
          </div>
          <p className="font-mono text-[8px] tracking-[0.06em] text-[#faf9f6]/15 mt-3 text-center">
            Адкажам на працягу 2 гадзін
          </p>
        </div>
      </div>
    </Panel>
  );
}

// ─── Footer ─────────────────────────────────────────────────
function FooterPanel() {
  return (
    <Panel bg="#0d0d0e">
      <div className="w-full text-center">
        <div className="text-[clamp(40px,8vw,100px)] font-light tracking-[-0.04em] text-[#faf9f6]/[0.05] leading-none mb-6">
          svyatlitsa
        </div>
        <div className="flex gap-5 justify-center flex-wrap mb-6">
          {['LABS67', 'SCYRA.AI', 'SLYAH.AI', 'SKARBY', 'SVITA'].map((b) => (
            <a key={b} href="#" className="font-mono text-[9px] tracking-[0.08em] text-[#faf9f6]/15 hover:text-[#c9a96e] transition-colors no-underline">{b}</a>
          ))}
        </div>
        <div className="font-mono text-[9px] tracking-[0.06em] text-[#faf9f6]/12">
          &copy; 2026 svyatlitsa &middot; LABS67
        </div>
        <div className="mt-1.5 font-mono text-[8px] text-[#c9a96e]/30">
          &#9679; AI-POWERED CLINIC
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-8 font-mono text-[9px] tracking-[0.1em] uppercase text-[#faf9f6]/15 hover:text-[#c9a96e] transition-colors cursor-pointer bg-transparent border-none"
        >
          ↑ Наверх
        </button>
      </div>
    </Panel>
  );
}

// ─── Horizontal Scroll Container ────────────────────────────
const PANEL_COUNT = 5;

export default function HorizontalSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // x percentage is relative to the container width (PANEL_COUNT * 100vw).
  // To scroll (PANEL_COUNT-1) panels we need -(PANEL_COUNT-1)/PANEL_COUNT * 100%.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${-((PANEL_COUNT - 1) / PANEL_COUNT) * 100}%`]
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${PANEL_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${PANEL_COUNT * 100}vw` }}
        >
          <AboutPanel />
          <ServicesPanel />
          <ProcessPanel />
          <BookingPanel />
          <FooterPanel />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#c9a96e]/30 origin-left"
          style={{ scaleX: scrollYProgress, width: '100%' }}
        />
      </div>
    </section>
  );
}
