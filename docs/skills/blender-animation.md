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

## 自然物を細かく作り込むとき

- 制作側の [上級操作の再現手順](../../../blender-works/docs/skills/references/blender-advanced-recipes.md) で、細分化と厚み、Geometry Nodesの散布、Cyclesベイク、共有形状とGPU instancingの必要な節を読む。手順は制作側を正本とし、こちらへ複製しない。
- 湖畔の確認済み実装は `blender-works/assets/animations/lakeside_glow/`。同手順に再生成コマンドと関数別の参照先がある。応用候補のスカルプト・投影・シミュレーションは、それぞれの対象アセットで小さく検証してから採用する。
- Blender固有の表現は評価Mesh、PBR画像、対応するclip、runtime効果のどれで渡すか決める。静止GLBとruntimeの水面・パーティクルを、Blenderのシミュレーションを輸出したものとして説明しない。
- 中立照明のpreviewと実際の鑑賞画面を比較する。初回読込容量、近遠のalpha輪郭、停止・再開も確認し、検査済みモデルと撮影したpreviewを内容ハッシュ付きURLで同期する。湖畔の同期には制作元の `sync_web.py` を使う。

## リアル寄りの焚き火を更新するとき

- 正本は `blender-works/assets/animations/hearth_fire/`。実体の形状はBlender、炎・煙・火の粉などGLBで扱えない効果は同ディレクトリの `runtime/campfire.js` で管理する。GLBにclipがある方式と、静止GLB＋runtime方式を区別して検査・記録する。
- 樹皮・年輪・炭化・石の粗さは、形状、Normal、Roughness、Emissionの役割を分けて作る。glTFへ渡らない手続き材質は画像化し、Modifierは評価して書き出す。近接度に合わせて画像解像度を変える。
- `build.py` → `validate_export.py` の後、中立照明のBlender previewと実際のWeb表示を確認する。炎は薪との前後関係、火の粉は発生・上昇・消滅、停止は全効果と照明に効くかを確認する。
- Web画面から `output/hearth_fire/previews/beauty.png` を保存し、`sync_web.py` で両Web実装へ同じruntimeをコピーする。続けて `python3 -m pipeline.catalog.publish` でBlender works側のカタログを生成する。
- `public/models` と `public/previews` は長期キャッシュ対象なので、差し替えは内容ハッシュ付きの新しいURLにする。旧版は配信対象から外す。
- UIの文言は「Blenderアニメーション集」「焚き火」「炎・火の粉・煙」程度の説明に留め、詩的な宣伝文句は加えない。
