# 商略AI プロモーション

青いワンピースの女の子を案内役にした、20秒・1920×1080・24fpsのBlender映像。白、紺、ゴールドは商略AIのサイトを参照。広告内の図は概念表現で、実際の管理画面や成果数値ではない。

## 構成

- 0–4.25秒: 「その数字、次の一手に。」。事業情報・連携データ・検索市場のカード。
- 4.25–9.21秒: 「事業と数字を、ひとつにつなぐ。」。女の子が案内する仕草。
- 9.21–14.25秒: 「分析から、具体的な施策へ。」。広告・記事・投稿・次の手順を示す提案カード。
- 14.25–20秒: 商略AI、月額980円から、14日間無料で試す。カード登録不要・自動課金なし、shoryaku.net。女の子が手を振る。

20秒の一度再生を想定し、ループの端は接続しない。価格・無料体験・機能は2026-10-30の[公式サイト](https://shoryaku.net/)を確認した。公開や再利用時に価格が変わっていれば字幕を更新する。

## 入力と再現

制作工程はBlender 5.2.2 LTS、ffmpeg、Python 3 + numpyを使用。女の子の入力は `output/blue_dress_heroine/blue_dress_heroine.blend`。無い場合は `assets/characters/blue_dress_heroine/build.py` で先に再生成する。元の人物ソース・元のBlendは変更しない。

```sh
/Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 --python assets/animations/shoryaku_promo/build.py -- --preview --export
/Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 --python assets/animations/shoryaku_promo/validate_export.py
/Applications/Blender.app/Contents/MacOS/Blender -b output/shoryaku_promo/blend/shoryaku_promo.blend -s 1 -e 480 -a
python3 assets/animations/shoryaku_promo/finish.py
python3 assets/animations/shoryaku_promo/sync_web.py
```

生成物はすべて `output/shoryaku_promo/`。Blendは画像・フォントを内包し、キャラクターの骨、表情、カメラ、文字、カードの動きを編集できる。タイムラインに4つの場面マーカーを置く。字幕の正本は`build.py`。GLBは文字・曲線をMesh化し、Scene全体のアニメーションを2フレーム刻みで出力し、1本の`ShoryakuPromo` clipへまとめる。照明のEevee表現とWebの見え方には差があるため、完成映像はMP4を正本とする。

## 素材

- キャラクター: `blender-works/assets/characters/blue_dress_heroine`。VRoid Studioの標準素体・髪型・衣装・靴を使った既存モデル。クレジットは `blender-works / VRoid Studio / pixiv Inc.`。モデルの利用条件は人物アセットのREADMEと[VRoid Studioガイドライン](https://vroid.com/studio/guidelines)に従う。
- 書体: Noto Sans CJK JP Medium、SIL Open Font License 1.1。同梱の`FONT-LICENSE.txt`。[公式配布元](https://github.com/notofonts/noto-cjk)。buildはSHA-256で入力を固定し、フォントを生成物フォルダへダウンロードする。
- ロゴ: 公式サイトの紺・金のブロックマークをBlenderの形状で再現。商略AIの広告用途。
- 音楽: `finish.py`で合成したオリジナルの短いインストゥルメンタル。既存曲、外部の録音、音声合成サービスは使用していない。ナレーションなし。

顔のまばたき、腕の案内・手振りはキーフレーム。布・髪は元のスキニングを使い、物理シミュレーションは行わない。地面、靴、肩・肘の変形、字幕の重なりを代表フレームで確認する。

## 確認結果

保存Blendの再読込、GLBの独立再取込、全身134骨と主要関節の6時点照合を実施。主要関節の最大誤差は0.00000048m。両足の位置は固定され、最終場面で手が上がることを検査した。90,295三角形、69 Mesh、21材質、GLB約10.5MB。再生成したGLBは構造・JSONが同一で、浮動小数点差は最大0.00000006。MP4はH.264 + AAC、1920×1080、480フレーム、20.000秒。

代表4場面の人物、字幕、台座、腕の変形を目視。Webは1280px/390px、停止画像の一致、再開、最後の停止、Home/Endでのシーク、WebGLが使えない状況を模した代替表示を確認。動画・3Dとも自動再生せず、動きを減らす設定でも静止状態から始まる。
