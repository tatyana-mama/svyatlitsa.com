'use client';

const sites = [
  { name: 'LABS67', href: 'https://labs67.com', color: '#B8860B' },
  { name: 'Svyatlitsa', href: 'https://svyatlitsa.com', color: '#CF101A', active: true },
  { name: 'SCYRA.AI', href: 'https://scyra.labs67.com', color: '#00D4FF' },
  { name: 'SLYAH.AI', href: 'https://academi67.com', color: '#1df59a' },
  { name: 'Skarby', href: 'https://trade.labs67.com', color: '#30dcff' },
  { name: 'SVITA', href: 'https://franchise.labs67.com', color: '#ff4d6d' },
];

export default function SidePanel() {
  return (
    <aside className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col w-[56px] hover:w-[220px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] hidden md:flex">
      {sites.map((site, i) => (
        <a
          key={site.name}
          href={site.href}
          className={`group flex items-center gap-[14px] px-5 py-[14px] no-underline transition-all duration-300 border-l-[3px] backdrop-blur-[16px]
            ${i === 0 ? 'rounded-tl-[16px]' : ''} ${i === sites.length - 1 ? 'rounded-bl-[16px]' : ''}
            ${site.active
              ? 'border-l-[var(--c)] bg-white/[0.04]'
              : 'border-l-transparent hover:bg-white/[0.06] hover:border-l-[var(--c)]'}
            bg-[#1d1d1f]/70`}
          style={{ '--c': site.color } as React.CSSProperties}
        >
          <span
            className="w-[10px] h-[10px] rounded-full shrink-0 transition-transform duration-200 group-hover:scale-[1.3]"
            style={{ background: site.color, boxShadow: `0 0 8px ${site.color}` }}
          />
          <span className="font-[Inter] text-[15px] font-semibold text-[#faf9f6] whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-[.w-\[220px\]]:opacity-100 group-[.w-\[220px\]]:translate-x-0 tracking-[-0.01em] sp-name">
            {site.name}
          </span>
        </a>
      ))}
      <style jsx>{`
        aside:hover .sp-name {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </aside>
  );
}
