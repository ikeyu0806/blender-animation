import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { works } from './catalog.js';

const fire = works[0];
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const FireStage = lazy(() => import('./FireStage.jsx'));
const LakeStage = lazy(() => import('./LakeStage.jsx'));
const GardenExperience = lazy(() => import('./GardenExperience.jsx'));
const PromoExperience = lazy(() => import('./PromoExperience.jsx'));

function Mark() {
  return <span className="mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3c3.6 5.8-.8 8.6 2.2 13.3 1-3.3 4.8-5.7 5.1-7 6 10.8 2 19.7-7.3 19.7C6.2 29 2 20.4 7.7 12.9c.1 4.4 2.1 6.3 4.8 7C11.2 12 13.4 7.7 16 3Z" stroke="currentColor" strokeWidth="1.4"/><path d="M16 16c1.6 3.4-.9 5 1.2 7 1-1.8 2-3.4 2.4-4.3 2.3 4.8-.3 8-3.6 8-4.2 0-6-4.1-3.1-7.2 0 2.2 1.2 3.2 2.5 3.8-.4-4.1.6-6 3-8.3Z" fill="currentColor"/></svg></span>;
}

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function Header({ detail }) {
  return <header className="site-header">
    <a className="brand" href={asset('/')} aria-label="Blenderアニメーション集のトップへ"><Mark /><span>BLENDER<small>ANIMATION CATALOG</small></span></a>
    <nav aria-label="メインナビゲーション"><a href={detail ? asset('/') : '#collection'}>作品一覧 <Arrow diagonal /></a></nav>
    <span className="header-edition">{String(works.length).padStart(2, '0')} WORKS</span>
  </header>;
}

function Footer() {
  return <footer className="site-footer"><span>Blenderアニメーション集</span><span>Blender + Three.js</span><span>© 2026</span></footer>;
}

function Catalog() {
  return <div className="site-shell catalog-page">
    <Header />
    <main>
      <section className="catalog-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> BLENDER + THREE.JS</div>
          <h1 id="hero-title">Blender<br /><em>アニメーション集</em></h1>
          <p>Blenderで制作したアニメーションを<br />ブラウザで再生できます。</p>
          <a className="text-link" href="#collection">作品一覧を見る <Arrow /></a>
        </div>
        <div className="hero-art">
          <div className="hero-halo" />
          <img src={asset(fire.preview)} alt="石と薪に囲まれた焚き火" />
          <div className="hero-art-note"><span>01 / 焚き火</span><span>連続再生</span></div>
        </div>
        <div className="hero-vertical" aria-hidden="true">作品一覧 <span>↓</span></div>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="section-topline"><span>CATALOG</span><span>{works.length}件</span></div>
        <div className="section-heading"><div><h2 id="collection-title">作品一覧</h2></div></div>
        <div className="work-grid">
          {works.map((work) => <a className="work-card" href={asset(work.path)} key={work.id}>
            <div className="work-image"><img src={asset(work.preview)} alt="" loading="lazy" /><span className="work-play" aria-hidden="true">↗</span></div>
            <div className="work-meta"><span>NO. {work.number} <i /> {work.category}</span><span>{work.duration}</span></div>
            <div className="work-title-row"><div><h3>{work.title}</h3><span>{work.english}</span></div><Arrow diagonal /></div>
            <p>{work.description}</p>
          </a>)}
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}

function Detail({ work }) {
  const isLake = work.id === 'lakeside-glow';
  const Stage = isLake ? LakeStage : FireStage;
  const [resetKey, setResetKey] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [sound, setSound] = useState(false);
  const audio = useRef(null);

  useEffect(() => {
    document.title = `${work.title} | Blenderアニメーション集`;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => { if (event.matches) setPlaying(false); };
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, [work.title]);

  useEffect(() => {
    if (!audio.current) return;
    if (sound) audio.current.play().catch(() => setSound(false));
    else audio.current.pause();
  }, [sound]);
  return <div className={`site-shell detail-page ${isLake ? 'lakeside-page' : ''}`}>
    <Header detail />
    <main>
      <section className="detail-head"><a className="back-link" href={asset('/')}>← <span>作品一覧へ戻る</span></a><span>{work.number} / {work.title}</span></section>
      <section className="detail-content" aria-labelledby="detail-title">
        <div className="detail-stage-column">
          <div className="detail-stage-frame"><Suspense fallback={<div className="stage-message" role="status">{work.title}を準備しています…</div>}><Stage model={asset(work.model)} preview={asset(work.preview)} playing={playing} resetKey={resetKey} /></Suspense><span className="stage-corner top-left">BLENDER / {work.number.padStart(3, '0')}</span><span className="stage-corner bottom-right">ドラッグで視点変更</span></div>
          <div className="stage-controls"><div className="control-buttons"><button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}><span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span> {playing ? '動きを止める' : '動かす'}</button>{work.audio && <button type="button" onClick={() => setSound((value) => !value)} aria-pressed={sound}><span aria-hidden="true">{sound ? '◖))' : '◖'}</span> {sound ? '音を消す' : '焚き火の音を聴く'}</button>}{isLake && <button type="button" onClick={() => setResetKey((value) => value + 1)}><span aria-hidden="true">↺</span> 視点を戻す</button>}</div><span>{isLake ? 'ドラッグ・矢印キーで視点変更' : 'ドラッグで角度を変えられます'}</span></div>
          {work.audio && <audio ref={audio} src={asset(work.audio)} loop preload="none" />}
        </div>
        <div className="detail-copy"><div className="detail-eyebrow">ANIMATION {work.number.padStart(3, '0')} <span>—</span> CONTINUOUS</div><h1 id="detail-title">{work.title}</h1><p className="detail-english">{work.english.toUpperCase()}</p><div className="detail-rule" /><p className="detail-lead">{work.lead}</p><p className="detail-description">{isLake ? '月明かりの湖に、たくさんの光がゆっくりと漂います。再生・停止、視点を変更できます。' : '再生・停止、音、視点を変更できます。'}</p><div className="detail-spec"><div><span>再生時間</span><strong>連続再生</strong></div><div><span>制作</span><strong>Blender</strong></div><div><span>表示</span><strong>Three.js</strong></div></div></div>
      </section>
      <section className="detail-after">{isLake ? <div><h2>湖畔の風景</h2><p>湖面に映る月と森、桟橋のランタン。蛍と光の粒子がゆっくり巡ります。音声はありません。</p></div> : <div><h2>音声素材</h2><p>“Campfire sound ambience” by Glaneur de sons · <a href="https://commons.wikimedia.org/wiki/File:Campfire_sound_ambience.ogg" target="_blank" rel="noreferrer">CC BY 3.0</a>。元の録音をループ再生します。</p></div>}<a href={asset('/')} className="return-link">作品一覧へ戻る <Arrow /></a></section>
    </main>
    <Footer />
  </div>;
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const work = works.find((entry) => asset(entry.path).replace(/\/+$/, '') === pathname);
  if (work?.id === 'shoryaku-promo') return <Suspense fallback={<p role="status">ムービーを準備しています…</p>}><PromoExperience work={work} /></Suspense>;
  if (work?.id === 'nocturnal-garden') return <Suspense fallback={<div className="stage-message" role="status">夜の花園を準備しています…</div>}><GardenExperience work={work} /></Suspense>;
  return work ? <Detail work={work} /> : <Catalog />;
}
