import { lazy, Suspense } from 'react';
import { works } from './catalog.js';

const PromoExperience = lazy(() => import('./PromoExperience.jsx'));
const featured = works[0];
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function Mark() {
  return <span className="mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><rect x="3" y="7" width="26" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 13h26M10 7l4 6m5-6 4 6M11 18l9 4-9 4v-8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg></span>;
}

function Catalog() {
  return <div className="site-shell catalog-page">
    <header className="site-header"><a className="brand" href={asset('/')} aria-label="Blender映像作品集のトップへ"><Mark /><span>BLENDER<small>FILM CATALOG</small></span></a><nav aria-label="メインナビゲーション"><a href="#collection">作品一覧 ↗</a></nav><span className="header-edition">{String(works.length).padStart(2, '0')} FILM</span></header>
    <main>
      <section className="catalog-hero" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> BLENDER / BRAND FILM</div><h1 id="hero-title">Blender<br /><em>映像作品集</em></h1><p>Blenderで制作した短いCMや映像作品を<br />ブラウザで鑑賞できます。</p><a className="text-link" href={asset(featured.path)}>商略AIのCMを見る <span className="arrow" aria-hidden="true">→</span></a></div>
        <div className="hero-art"><div className="hero-halo" /><img src={asset(featured.preview)} alt={featured.alt} /><div className="hero-art-note"><span>01 / 商略AI</span><span>20秒 · 音声なし</span></div></div>
        <div className="hero-vertical" aria-hidden="true">映像作品 <span>↓</span></div>
      </section>
      <section className="collection" id="collection" aria-labelledby="collection-title"><div className="section-topline"><span>FILM CATALOG</span><span>{works.length}件</span></div><div className="section-heading"><h2 id="collection-title">映像作品</h2></div><div className="work-grid">{works.map((work) => <a className="work-card" href={asset(work.path)} key={work.id}><div className="work-image"><img src={asset(work.preview)} alt="" loading="lazy" /><span className="work-play" aria-hidden="true">↗</span></div><div className="work-meta"><span>NO. {work.number} · {work.category}</span><span>{work.duration}</span></div><div className="work-title-row"><div><h3>{work.title}</h3><span>{work.english}</span></div><span className="arrow" aria-hidden="true">↗</span></div><p>{work.description}</p></a>)}</div></section>
    </main>
    <footer className="site-footer"><span>Blender映像作品集</span><span>Blender + Three.js</span><span>© 2026</span></footer>
  </div>;
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '');
  if (pathname === asset(featured.path).replace(/\/+$/, '')) return <Suspense fallback={<p role="status">ムービーを準備しています…</p>}><PromoExperience work={featured} /></Suspense>;
  return <Catalog />;
}
