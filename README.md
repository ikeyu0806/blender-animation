# Blender映像作品集

Blenderで制作したCMや短い映像作品を鑑賞するカタログです。現在は青いワンピースの女の子が商略AIを紹介する[20秒のプロモーションムービー](https://blender-animation.pages.dev/works/shoryaku-promo/)を掲載しています。ムービーと、同じBlenderアニメーションを再生する3D版があります。音声はありません。

焚き火・湖畔・夜の花園は、視点を操作できる空間として [`threejs-worlds`](../threejs-worlds/README.md) に移しました。旧作品URLから新しいワールドへ転送します。これらの3Dモデルの正本とモデルカタログは [`blender-works`](../blender-works/README.md) にあります。

## ローカルで見る

Node.js 22.12以降を使い、`npm ci` の後に `npm run dev` を実行します。`/` で映像一覧、`/works/shoryaku-promo/` でCMを開けます。公開用の確認は `npm run build` と `npm run preview` です。

## 制作

正本は `blender-works/assets/animations/shoryaku_promo/` にあります。`build.py` で顔・手・カメラを含む20秒のSceneを再生成し、`validate_export.py` で保存BlendとGLBを照合します。Blenderの連番を `finish.py` で音声なしのMP4にし、`sync_web.py` で検査済みアセットをこのリポジトリへ同期します。制作・掲載の手順は [開発ガイド](docs/skills/blender-animation.md) と [制作記録](docs/assets/shoryaku-promo.md)を参照してください。

## 公開

[blender-animation.pages.dev](https://blender-animation.pages.dev/) に `dist/` を配信します。`main` へのpush時はGitHub Actionsがbuildを確認し、Cloudflare Pagesの認証シークレットがあれば公開します。手元からの公開は認証済み環境で `npm run build` の後に `npx wrangler pages deploy dist --project-name blender-animation --branch main` を実行します。
