import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const PromoStage = lazy(() => import('./PromoStage.jsx'));
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function PromoExperience({ work }) {
  const [mode, setMode] = useState('movie');
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    document.title = `${work.title} | Blender映像作品集`;
    const pause = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, [work.title]);
  function changeMode(next) {
    video.current?.pause();
    setMode(next);
  }
  return <div className="promo-page">
    <header className="promo-header"><a href={asset('/')}>← 映像作品一覧</a><span>BLENDER FILM CATALOG</span><span>01 / PROMOTION</span></header>
    <main className="promo-main">
      <div className="promo-heading"><div><p>SHORYAKU AI · BRAND FILM</p><h1>商略AI プロモーション</h1></div><span>{work.duration} / 1920 × 1080 / 24fps</span></div>
      <div className="promo-switch" role="group" aria-label="表示形式">
        <button type="button" aria-pressed={mode === 'movie'} onClick={() => changeMode('movie')}>ムービー</button>
        <button type="button" aria-pressed={mode === 'scene'} onClick={() => changeMode('scene')}>3Dアニメーション</button>
      </div>
      {mode === 'movie' ? <>
        <video className="promo-video" ref={video} controls playsInline preload="metadata" width="1920" height="1080" poster={asset(work.preview)} src={asset(work.video)} onError={() => setFailed(true)} aria-label={`商略AIの${work.duration}プロモーションムービー`} aria-describedby="promo-description">
          <track kind="captions" src={asset(work.captions)} srcLang="ja" label="日本語" />
          <a href={asset(work.video)}>MP4を開く</a>
        </video>
        {failed && <p role="alert">動画を読み込めませんでした。<a href={asset(work.video)}>MP4を直接開く</a></p>}
        <div className="promo-player-note"><span>音声なし</span><a href={asset(work.video)} download>MP4をダウンロード ↓</a></div>
      </> : <Suspense fallback={<p role="status">3Dアニメーションを準備しています…</p>}><PromoStage model={asset(work.model)} preview={asset(work.preview)} /></Suspense>}
      <section className="promo-info" id="promo-description">
        <div><p className="promo-kicker">月額980円で使える</p><h2>マーケティング<br />パートナー。</h2></div>
        <div><p>「ねえ、事業の作戦、一緒に考えよ？」。顔のアップから価格の紹介、情報を整理する演出、ウインクと笑顔へつなぐ16秒のVTuber風CMです。AIが情報を読み取って事業戦略を組み立てます。</p><p>情報カードの演出は情報を整理するイメージです。月額980円はライトプランの価格です。2026年11月16日時点の公式サイトに基づきます。</p><a className="promo-brand-link" href="https://shoryaku.net/" target="_blank" rel="noreferrer">商略AIのサイトへ ↗</a></div>
      </section>
      <details className="promo-transcript"><summary>映像の内容と制作クレジット</summary><ol><li>ねえ、事業の作戦、一緒に考えよ？</li><li>月額980円で使えるマーケティングパートナー。</li><li>AIが情報を読み取って事業戦略を組み立て。</li><li>あなたのマーケティングパートナー。商略AI。月額980円で使える。</li></ol><p>顔のアップで呼びかける女の子。左右に位置を切り替えて価格を紹介し、開いた掌に合わせて情報カードが整列します。最後はウインクと手振りから笑顔になり、商略AIの名前と shoryaku.net を表示して終わります。</p><p>キャラクター: blender-works / VRoid Studio / pixiv Inc. 書体: Noto Sans CJK JP（SIL OFL 1.1）。音声なし。</p><p>3D版は同じBlenderアニメーションを再生します。照明の見え方はムービーと異なります。</p><a href={asset('/media/shoryaku-promo-credits.txt')}>素材と制作記録</a></details>
    </main>
    <footer className="promo-footer"><a href={asset('/')}>Blender映像作品集</a><span>Blender + Three.js · 2026</span></footer>
  </div>;
}
