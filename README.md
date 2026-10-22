# Blenderアニメーション集

Blenderで制作したアニメーションをThree.jsで再生するカタログ。最初の作品は、3秒でループする「焚き火」。作品一覧から鑑賞画面へ進み、再生・停止、音のオン・オフ、ドラッグによる視点変更ができる。

## ローカルで見る

Node.js 22.12以降を使う。

```sh
npm ci
npm run dev
```

表示されたURLで一覧 `/` と作品 `/works/hearth-fire/` を開く。公開用の確認は `npm run build`、`npm run preview`。

## モデルの制作と掲載

制作ソースは隣の `blender-works/assets/animations/hearth_fire/` にあり、Blender backgroundで `.blend`、GLB、preview、検査reportを再生成する。このリポジトリの `public/models/hearth-fire.glb` と `public/previews/hearth-fire.png` は検査済みのコピー。形状を変更するときは `blender-works` 側で修正・検査・commitしてから、こちらへコピーする。詳しい手順は [開発skill](docs/skills/blender-animation.md) に記載。

音声 `public/audio/campfire-ambience.ogg` は [Campfire sound ambience](https://commons.wikimedia.org/wiki/File:Campfire_sound_ambience.ogg) by Glaneur de sons、[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)。元のOGGをそのまま掲載し、ブラウザのloop再生で使う。

## Cloudflare Pages

公開URLは [blender-animation.pages.dev](https://blender-animation.pages.dev/)。出力は静的な `dist/`。Pagesプロジェクト名は `blender-animation`、production branchは `main`。GitHub Actionsはmainへのpush時に `npm ci` と `npm run build` を実行する。リポジトリのSecretsに `CLOUDFLARE_API_TOKEN`（Pages編集権限）と `CLOUDFLARE_ACCOUNT_ID` があれば、ビルド成功後にCloudflare Pagesへ自動デプロイする。Secretsがない間はビルドのみ行い、公開は手元の認証環境から実行する。

手元から同じビルドを直接公開するときは、Cloudflare認証済みの環境で次を実行する。

```sh
npm run build
npx wrangler pages deploy dist --project-name blender-animation --branch main
```

Cloudflare Pagesへの初回登録時は、プロジェクトのproduction branchを `main` にする。`dist/` と `node_modules/` はGitに含めない。
