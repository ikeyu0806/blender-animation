# アニメーション制作・掲載

## 責任の境界

- 形状、材質、キーフレームの正本は `/Users/ikegayayuuki/workspace/blender-works/assets/animations/<slug>/` に置く。Blender内で再生成できるスクリプト、用途と制約を記した `asset.json` / README を含める。
- `.blend`、GLB、preview、検査reportは同PJの `output/<slug>/` に生成する。`output/` は commit しない。
- このPJの `public/models/` には、検査済みGLBだけをコピーする。Three.jsは読み込み、配置、ライティング、再生制御を担当し、モデルの形状を二重管理しない。
- Webで使う音や画像を複製する場合は、出典・ライセンス・変更点をこのPJにも残す。

## 追加する順序

1. アニメーションの用途、秒数、ループ境界、縮尺、描画負荷の目安を決める。`blender-works` の `AGENTS.md` と適用されるskillを読む。
2. Blender backgroundで生成・保存・GLB書き出しを実行し、保存した `.blend` とGLBの再取り込み、clipと主要な寸法を検査する。代表フレームを目視する。
3. `blender-works` のソースと文書だけを、検証済みの論理単位ごとに commit する。
4. 採用GLBをこのPJへコピーし、カタログデータ、プレビュー、3D再生、停止操作を実装する。GLBのURLはViteの `BASE_URL` に従う。
5. モバイル幅、キーボード操作、動きを減らす設定、WebGLが使えない場合の案内を確認し、buildと実画面で検証する。確認した単位ごとにこのPJで commit する。

## 公開

Cloudflare Pages はリポジトリのルートをビルドし、出力 `dist/` を配信する。公開に必要なCloudflareプロジェクトと認証があるときは、buildを通した同じ内容をデプロイする。認証やプロジェクトがない場合は設定手順と不足条件を報告する。pushは依頼された公開作業に必要な場合だけ行う。
