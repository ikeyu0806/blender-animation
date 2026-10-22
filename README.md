# Blenderアニメーション集

Blenderで制作したアニメーションをThree.jsで再生するカタログ。「焚き火」と「湖畔」を掲載。作品一覧から鑑賞画面へ進み、再生・停止とドラッグによる視点変更ができる。

「湖畔」は月明かりの湖、森、桟橋とランタンに、蛍720個・湖面の光1000個・星360個を重ねた48秒ループ。湖面は周囲の景色を反射する。矢印キーで視点変更、Homeキーまたはボタンで視点を戻せる。音声は焚き火だけに用意している。

## ローカルで見る

Node.js 22.12以降を使う。

```sh
npm ci
npm run dev
```

表示されたURLで一覧 `/` と作品 `/works/hearth-fire/`、`/works/lakeside-glow/` を開く。公開用の確認は `npm run build`、`npm run preview`。

## モデルの制作と掲載

制作ソースは隣の `blender-works/assets/animations/hearth_fire/` にあり、Blender backgroundで `.blend`、GLB、preview、検査reportを再生成する。このリポジトリの `public/models/hearth-fire-<hash>.glb` と `public/previews/hearth-fire-<hash>.png` は検査済みのコピー。形状を変更するときは `blender-works` 側で修正・検査・commitしてから、こちらへコピーする。`src/generated/campfire.js` は同じ制作元の `runtime/campfire.js` を同期したもの。GLBは静止した実体モデルで、炎・火の粉・煙はこのruntimeが描画する。同期は制作元の `sync_web.py` を使う。詳しい手順は [開発skill](docs/skills/blender-animation.md) に記載。

音声 `public/audio/campfire-ambience.ogg` は [Campfire sound ambience](https://commons.wikimedia.org/wiki/File:Campfire_sound_ambience.ogg) by Glaneur de sons、[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)。元のOGGをそのまま掲載し、ブラウザのloop再生で使う。

湖畔の正本は `blender-works/assets/animations/lakeside_glow/`。`build.py` → `validate_export.py` → `sync_web.py` の順に生成・再取り込み検査・同期する。`src/generated/lakeside.js` は正本runtimeのコピーで、直接編集しない。GLBは79,050三角形、18メッシュ、約4.9MB。静止した形状をGLBで受け渡し、水面・パーティクル・照明はruntimeが動かす。外部素材は使用していない。

両作品とも、動きを減らす設定では停止状態から始まり、画面外・非表示タブでは描画を休止する。湖畔ではデスクトップ・390px幅、停止中の画像一致、再開、矢印キー・Home、動きを減らす設定、WebGL非対応・読込失敗時のプレビューを確認済み。

## Cloudflare Pages

公開URLは [blender-animation.pages.dev](https://blender-animation.pages.dev/)。出力は静的な `dist/`。Pagesプロジェクト名は `blender-animation`、production branchは `main`。GitHub Actionsはmainへのpush時に `npm ci` と `npm run build` を実行する。リポジトリのSecretsに `CLOUDFLARE_API_TOKEN`（Pages編集権限）と `CLOUDFLARE_ACCOUNT_ID` があれば、ビルド成功後にCloudflare Pagesへ自動デプロイする。Secretsがない間はビルドのみ行い、公開は手元の認証環境から実行する。

手元から同じビルドを直接公開するときは、Cloudflare認証済みの環境で次を実行する。

```sh
npm run build
npx wrangler pages deploy dist --project-name blender-animation --branch main
```

Cloudflare Pagesへの初回登録時は、プロジェクトのproduction branchを `main` にする。`dist/` と `node_modules/` はGitに含めない。
