# Blender映像作品の制作・掲載

## 責任の境界

- CM・ブランドフィルムの形状、材質、キーフレーム、字幕、カメラの正本は `blender-works/assets/animations/<slug>/` に置く。再生成スクリプト、`asset.json`、READMEを含める。
- `.blend`、GLB、連番、MP4、preview、reportは `blender-works/output/<slug>/` に生成し、commitしない。
- このリポジトリには検査済みGLB、MP4、preview、字幕、クレジットをコピーする。Three.js版はBlenderの同じclipを読み込み、停止やシークを担当する。完成映像の色・照明はMP4を正とする。
- 視点を自由に変える焚き火・湖畔・夜の花園は `threejs-worlds` の独立したワールドとして管理する。モデル制作とモデルカタログは `blender-works` に置く。

## 制作の順序

1. 映像の用途、秒数、解像度、音声の有無、各カット、素材の出典、表示負荷を決める。商品・料金の訴求は公開前に公式情報を確認する。
2. `blender-works` のAGENTS.mdと適用skillを読み、Blender backgroundで生成・保存・GLB書き出しを実行する。保存BlendとGLBの再取り込み、人物・カメラ・字幕の主要時点を検査する。
3. 代表カットを目視し、連番をMP4へまとめる。音声なしの指定ならMP4に音声トラックを含めない。
4. 制作元のソースと文書をcommitし、そのままpushする。検査済みファイルだけをこのリポジトリへ同期し、カタログ、ポスター、動画、3D再生、停止操作を更新する。URLはViteの `BASE_URL` に従う。
5. desktopとmobile、キーボード操作、動きを減らす設定、WebGLなしの案内を実画面で確認し、buildを通す。カタログの変更は別commitにし、そのままpushする。Git運用は [AGENTS.md](../../AGENTS.md) に従い、依頼ごとの追加確認は求めない。

## 公開

Cloudflare Pagesはこのリポジトリのルートでbuildし、`dist/`を配信する。push後はCIと公開URLを確認し、既存CIが公開を省略した場合は認証済みの手元から検証済みの同じ内容をデプロイする。関連する `threejs-worlds`・`blender-works` も各AGENTS.mdに従ってcommit・push・公開確認まで進める。移行先の公開を確認してから旧URLの転送を公開する。ユーザーがその依頼で公開しないと指定した場合は省く。
