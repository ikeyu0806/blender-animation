import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const PromoStage = lazy(() => import('./PromoStage.jsx'));
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function PromoExperience({ work }) {
  const [mode, setMode] = useState('movie');
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    document.title = `${work.title} | Blenderアニメーション集`;
    const pause = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, [work.title]);
  function changeMode(next) {
    video.current?.pause();
    setMode(next);
  }
  return <div className="promo-page">
    <header className="promo-header"><a href={asset('/')}>← 作品一覧</a><span>BLENDER ANIMATION CATALOG</span><span>04 / PROMOTION</span></header>
    <main className="promo-main">
      <div className="promo-heading"><div><p>SHORYAKU AI · BRAND FILM</p><h1>商略AI プロモーション</h1></div><span>20秒 / 1920 × 1080 / 24fps</span></div>
      <div className="promo-switch" role="group" aria-label="表示形式">
        <button type="button" aria-pressed={mode === 'movie'} onClick={() => changeMode('movie')}>ムービー</button>
        <button type="button" aria-pressed={mode === 'scene'} onClick={() => changeMode('scene')}>3Dアニメーション</button>
      </div>
      {mode === 'movie' ? <>
        <video className="promo-video" ref={video} controls playsInline preload="metadata" width="1920" height="1080" poster={asset(work.preview)} src={asset(work.video)} onError={() => setFailed(true)} aria-label="商略AIの20秒プロモーションムービー" aria-describedby="promo-description">
          <track kind="captions" src={asset(work.captions)} srcLang="ja" label="日本語" />
          <a href={asset(work.video)}>MP4を開く</a>
        </video>
        {failed && <p role="alert">動画を読み込めませんでした。<a href={asset(work.video)}>MP4を直接開く</a></p>}
        <div className="promo-player-note"><span>オリジナルBGM付き・ナレーションなし</span><a href={asset(work.video)} download>MP4をダウンロード ↓</a></div>
      </> : <Suspense fallback={<p role="status">3Dアニメーションを準備しています…</p>}><PromoStage model={asset(work.model)} preview={asset(work.preview)} /></Suspense>}
      <section className="promo-info" id="promo-description">
        <div><p className="promo-kicker">その数字、次の一手に。</p><h2>事業と数字を、<br />具体的な施策へ。</h2></div>
        <div><p>青いワンピースの女の子が、商略AIを紹介する短いムービーです。事業情報・連携データ・検索市場をつなぎ、次のアクションへ案内します。</p><p>映像の図は機能を説明するイメージです。料金・無料体験の情報は2026年10月30日時点の公式サイトに基づきます。</p><a className="promo-brand-link" href="https://shoryaku.net/" target="_blank" rel="noreferrer">商略AIのサイトへ ↗</a></div>
      </section>
      <details className="promo-transcript"><summary>映像の内容と制作クレジット</summary><ol><li>その数字、次の一手に。マーケティングを、もっと前へ。</li><li>事業と数字を、ひとつにつなぐ。事業情報、連携データ、検索市場。</li><li>分析から、具体的な施策へ。クロスSWOT・STP・4P / 4Cで方針を。</li><li>商略AI。マーケティング特化AI。月額980円から。14日間無料で試す。カード登録不要・自動課金なし。</li></ol><p>キャラクター: blender-works / VRoid Studio / pixiv Inc. 書体: Noto Sans CJK JP（SIL OFL 1.1）。映像・音楽はこの作品用に制作。</p><p>3D版は同じBlenderアニメーションを再生します。照明の見え方はムービーと異なります。</p><a href={asset('/media/shoryaku-promo-credits.txt')}>素材と制作記録</a></details>
    </main>
    <footer className="promo-footer"><a href={asset('/')}>Blenderアニメーション集</a><span>Blender + Three.js · 2026</span></footer>
  </div>;
}
