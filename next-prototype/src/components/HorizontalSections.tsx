'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

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
      className="w-screen h-screen flex-shrink-0 flex items-center overflow-hidden snap-start snap-always"
      style={{ background: bg }}
    >
      <div className="w-full h-full flex items-center px-5 sm:px-8 md:px-16 lg:px-24">
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
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-4 sm:mb-5">
          Пра нас
        </p>
        <h2 className="text-[28px] sm:text-[clamp(28px,4.5vw,56px)] font-light tracking-[-0.03em] leading-[1.1] text-[#1d1d1f] mb-4 sm:mb-6">
          Не проста клініка.<br />
          <span className="text-[#c9a96e]">Прастора для жыцця.</span>
        </h2>
        <div className="w-10 sm:w-12 h-px bg-[#1d1d1f]/10 mb-4 sm:mb-6" />
        <p className="text-[14px] sm:text-[15px] font-light leading-[1.7] sm:leading-[1.8] text-[#1d1d1f]/45 max-w-md">
          Святліца — гэта месца, дзе тэхналогіі невідочныя, але адчуваюцца.
          Кожная дэталь прадумана: ад святла да гуку, ад матэрыялаў да руху паветра.
        </p>
        <div className="flex gap-8 sm:gap-10 mt-8 sm:mt-10">
          <div>
            <div className="text-[24px] sm:text-[28px] font-light text-[#c9a96e]">AI</div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-[#1d1d1f]/25 mt-1">Асістэнт</div>
          </div>
          <div>
            <div className="text-[24px] sm:text-[28px] font-light text-[#c9a96e]">0ms</div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-[#1d1d1f]/25 mt-1">Latency</div>
          </div>
          <div>
            <div className="text-[24px] sm:text-[28px] font-light text-[#c9a96e]">100%</div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.1em] uppercase text-[#1d1d1f]/25 mt-1">Прыватнасць</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Services ───────────────────────────────────────────────
function ServicesPanel() {
  const services = [
    { num: '01', title: 'Вініры', desc: 'Ідэальная ўсмешка за адзін дзень.' },
    { num: '02', title: 'Імплантацыя', desc: '3D-навігацыя, хірургічныя шаблоны.' },
    { num: '03', title: 'Артадонтыя', desc: 'Нябачныя элайнеры. AI-прагноз.' },
    { num: '04', title: 'Эстэтыка', desc: 'Адбельванне, digital smile design.' },
    { num: '05', title: 'Хірургія', desc: 'Мікраскоп, piezo, PRF.' },
    { num: '06', title: 'Тэрапія', desc: 'SCYRA.AI кожны этап.' },
  ];

  return (
    <Panel bg="#f5f5f7">
      <div className="w-full max-w-4xl mx-auto">
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-4 sm:mb-5">
          Паслугі
        </p>
        <h2 className="text-[24px] sm:text-[clamp(28px,4.5vw,48px)] font-light tracking-[-0.03em] leading-[1.1] text-[#1d1d1f] mb-6 sm:mb-10">
          Кожная паслуга —<br />
          <span className="text-[#c9a96e]">новы стандарт</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1d1d1f]/[0.06]">
          {services.map((s) => (
            <div key={s.num} className="bg-[#f5f5f7] p-4 sm:p-5 hover:bg-white transition-colors duration-300 group">
              <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-[#c9a96e]/50 mb-1.5 sm:mb-2 group-hover:text-[#c9a96e] transition-colors">
                {s.num}
              </div>
              <div className="text-[14px] sm:text-[15px] font-medium text-[#1d1d1f] mb-1">{s.title}</div>
              <div className="text-[11px] sm:text-[12px] font-light leading-[1.5] sm:leading-[1.6] text-[#1d1d1f]/35 group-hover:text-[#1d1d1f]/55 transition-colors">
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
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] mb-4 sm:mb-5">
          Працэс
        </p>
        <h2 className="text-[24px] sm:text-[clamp(28px,4.5vw,48px)] font-light tracking-[-0.03em] leading-[1.1] text-[#1d1d1f] mb-8 sm:mb-14">
          Чатыры крокі да<br />
          <span className="text-[#c9a96e]">вашай усмешкі</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-4 left-[60%] w-[80%] h-px bg-[#c9a96e]/15" />
              )}
              <div className="text-[20px] sm:text-[24px] font-light text-[#c9a96e]/30 mb-2 sm:mb-3">{step.num}</div>
              <div className="text-[14px] sm:text-[15px] font-medium text-[#1d1d1f] mb-1.5 sm:mb-2">{step.title}</div>
              <div className="text-[12px] font-light leading-[1.6] sm:leading-[1.7] text-[#1d1d1f]/35">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ─── Booking ────────────────────────────────────────────────
function BookingPanel() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), service }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('ok');
        setName('');
        setPhone('');
        setService('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Panel bg="#1d1d1f">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Info — hidden on mobile, form is enough */}
        <div className="hidden md:block flex-1 min-w-0">
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

        {/* Form — always visible */}
        <div className="w-full md:flex-1 md:min-w-0 bg-[#faf9f6]/[0.04] border border-[#faf9f6]/[0.06] rounded-2xl p-5 sm:p-7">
          {/* Mobile title */}
          <div className="md:hidden mb-4">
            <h2 className="text-[24px] font-light text-[#faf9f6] mb-1">
              Пачніце <span className="text-[#c9a96e]">зараз</span>
            </h2>
            <p className="text-[12px] text-[#faf9f6]/30">+48 571 719 800 · Пн–Пт 9:00–20:00</p>
          </div>

          <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#c9a96e] mb-4 sm:mb-5">
            Запіс на прыём
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-[11px] text-[#faf9f6]/25 mb-1.5">Імя</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-[#faf9f6]/10 text-[#faf9f6] text-[14px] sm:text-[14px] pb-2 outline-none focus:border-[#c9a96e]/50 transition-colors placeholder:text-[#faf9f6]/12" placeholder="Як вас завуць?" />
            </div>
            <div>
              <label className="block text-[11px] text-[#faf9f6]/25 mb-1.5">Тэлефон</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent border-b border-[#faf9f6]/10 text-[#faf9f6] text-[14px] sm:text-[14px] pb-2 outline-none focus:border-[#c9a96e]/50 transition-colors placeholder:text-[#faf9f6]/12" placeholder="+48 000 000 000" />
            </div>
            <div>
              <label className="block text-[11px] text-[#faf9f6]/25 mb-1.5">Паслуга</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full bg-transparent border-b border-[#faf9f6]/10 text-[#faf9f6]/40 text-[14px] pb-2 outline-none focus:border-[#c9a96e]/50 transition-colors">
                <option value="" className="bg-[#1d1d1f]">Абярыце</option>
                <option value="v" className="bg-[#1d1d1f]">Вініры</option>
                <option value="i" className="bg-[#1d1d1f]">Імплантацыя</option>
                <option value="o" className="bg-[#1d1d1f]">Артадонтыя</option>
                <option value="e" className="bg-[#1d1d1f]">Эстэтыка</option>
                <option value="t" className="bg-[#1d1d1f]">Тэрапія</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              disabled={status === 'sending' || !name.trim() || !phone.trim()}
              className="w-full mt-3 sm:mt-4 py-3 sm:py-3.5 rounded-full bg-[#c9a96e] text-[#1d1d1f] text-[14px] font-medium hover:bg-[#d4b477] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Адпраўляем...' : status === 'ok' ? '✓ Адпраўлена!' : 'Адправіць'}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-[12px] text-red-400 mt-2 text-center">Памылка. Паспрабуйце яшчэ раз.</p>
          )}
          <p className="font-mono text-[8px] tracking-[0.06em] text-[#faf9f6]/15 mt-3 text-center">
            {status === 'ok' ? 'Мы звяжамся з вамі!' : 'Адкажам на працягу 2 гадзін'}
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
        <div className="text-[48px] sm:text-[clamp(40px,8vw,100px)] font-light tracking-[-0.04em] text-[#faf9f6]/[0.05] leading-none mb-5 sm:mb-6">
          svyatlitsa
        </div>
        <div className="flex gap-4 sm:gap-5 justify-center flex-wrap mb-5 sm:mb-6">
          {['LABS67', 'SCYRA.AI', 'SLYAH.AI', 'SKARBY', 'SVITA'].map((b) => (
            <a key={b} href="#" className="font-mono text-[8px] sm:text-[9px] tracking-[0.08em] text-[#faf9f6]/15 hover:text-[#c9a96e] transition-colors no-underline">{b}</a>
          ))}
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.06em] text-[#faf9f6]/12">
          &copy; 2026 svyatlitsa &middot; LABS67
        </div>
        <div className="mt-1.5 font-mono text-[7px] sm:text-[8px] text-[#c9a96e]/30">
          &#9679; AI-POWERED CLINIC
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('horizontal-sections');
            if (el) {
              const container = el.querySelector('div');
              if (container) container.scrollTo({ left: 0, behavior: 'smooth' });
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 sm:mt-8 font-mono text-[9px] tracking-[0.1em] uppercase text-[#faf9f6]/15 hover:text-[#c9a96e] active:text-[#c9a96e] transition-colors cursor-pointer bg-transparent border-none"
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchLocked = useRef<'horizontal' | 'vertical' | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) setProgress(el.scrollLeft / maxScroll);
  }, []);

  // Desktop: wheel → horizontal snap
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isScrolling.current) { e.preventDefault(); return; }
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    if (el.scrollLeft <= 0 && e.deltaY < 0) return;
    if (el.scrollLeft >= maxScroll - 1 && e.deltaY > 0) return;

    e.preventDefault();

    const panelWidth = el.clientWidth;
    const currentPanel = Math.round(el.scrollLeft / panelWidth);
    const nextPanel = e.deltaY > 0
      ? Math.min(currentPanel + 1, PANEL_COUNT - 1)
      : Math.max(currentPanel - 1, 0);

    el.scrollTo({ left: nextPanel * panelWidth, behavior: 'smooth' });
    isScrolling.current = true;
    setTimeout(function() { isScrolling.current = false; updateProgress(); }, 800);
  }, [updateProgress]);

  // Mobile: vertical swipe → horizontal scroll
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchLocked.current = null;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;

    if (!touchLocked.current && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      touchLocked.current = Math.abs(dy) > Math.abs(dx) ? 'vertical' : 'horizontal';
    }

    if (touchLocked.current === 'vertical') {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft <= 0 && dy > 0) return;
      if (el.scrollLeft >= maxScroll - 1 && dy < 0) return;
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const dy = e.changedTouches[0].clientY - touchStart.current.y;

    const panelWidth = el.clientWidth;
    const currentPanel = Math.round(el.scrollLeft / panelWidth);

    if (touchLocked.current === 'vertical' && Math.abs(dy) > 50) {
      const nextPanel = dy < 0
        ? Math.min(currentPanel + 1, PANEL_COUNT - 1)
        : Math.max(currentPanel - 1, 0);
      el.scrollTo({ left: nextPanel * panelWidth, behavior: 'smooth' });
      setTimeout(updateProgress, 500);
    } else if (touchLocked.current === 'horizontal') {
      setTimeout(updateProgress, 500);
    }

    touchLocked.current = null;
  }, [updateProgress]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <section id="horizontal-sections" className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto h-screen snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <AboutPanel />
        <ServicesPanel />
        <ProcessPanel />
        <BookingPanel />
        <FooterPanel />
      </div>

      {/* Progress dots (mobile) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
        {Array.from({ length: PANEL_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{ background: progress >= (i / (PANEL_COUNT - 1)) - 0.05 && progress <= (i / (PANEL_COUNT - 1)) + 0.15 ? '#c9a96e' : 'rgba(255,255,255,0.15)' }}
          />
        ))}
      </div>

      {/* Progress bar (desktop) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent hidden md:block">
        <div
          className="h-full bg-[#c9a96e]/30 origin-left transition-transform duration-100"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </section>
  );
}
