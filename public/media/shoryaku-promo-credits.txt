# 商略AI プロモーション

青いワンピースの女の子を案内役にした20秒・1920×1080・24fpsのBlender映像。白、紺、ゴールドは[公式サイト](https://shoryaku.net/)を参照。映像内の図は概念表現で、実際の管理画面や成果数値ではない。価格、無料体験、機能は2026-11-05に公式サイトで確認した。

## 構成

- 0–4.25秒: 「その数字、次の一手に。」。事業情報・連携データ・検索市場のカード。全身から顔の寄りへ切り替える。
- 4.25–9.21秒: 「事業と数字を、ひとつにつなぐ。」。上半身と顔の寄りで案内の表情を見せる。
- 9.21–14.25秒: 「分析から、具体的な施策へ。」。提案カードと案内ポーズ。
- 14.25–20秒: 商略AI、月額980円から、14日間無料で試す。顔の寄りから全身のエンドカードへ切り替える。

表情は口角・目元・眉を独立したshape keyでアニメーションし、まばたきを加える。最後の手は手首の遷移と回転を調整し、手のひらを見せる案内ポーズにした。7つの撮影位置をカットで切り替える。20秒の一度再生を想定し、ループの端は接続しない。音声・BGM・ナレーションは入れない。

## 再生成

Blender 5.2.2 LTSとffmpegを使用。人物の入力は `output/blue_dress_heroine/blue_dress_heroine.blend`。無い場合は `assets/characters/blue_dress_heroine/build.py` で再生成する。元の人物ソース・Blendは変更しない。

```sh
/Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 --python assets/animations/shoryaku_promo/build.py -- --preview --export
/Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 --python assets/animations/shoryaku_promo/validate_export.py
/Applications/Blender.app/Contents/MacOS/Blender -b output/shoryaku_promo/blend/shoryaku_promo.blend -s 1 -e 480 -a
python3 assets/animations/shoryaku_promo/finish.py
python3 assets/animations/shoryaku_promo/sync_web.py
```

生成物は `output/shoryaku_promo/` に保存する。Blendは画像とフォントを内包し、人物、表情、カメラ、文字、カードの動きを編集できる。GLBは文字・曲線をMesh化し、アニメーションを1本の`ShoryakuPromo` clipへまとめる。完成映像の照明と色はMP4を正とし、Webの3D版では見え方が異なる。

## 素材・権利

- 人物: `blender-works/assets/characters/blue_dress_heroine`。VRoid Studioの標準素体・髪型・衣装・靴を使った既存モデル。クレジットは `blender-works / VRoid Studio / pixiv Inc.`。人物アセットのREADMEと[VRoid Studioガイドライン](https://vroid.com/studio/guidelines)に従う。
- 書体: Noto Sans CJK JP Medium、SIL Open Font License 1.1。`FONT-LICENSE.txt` と[公式配布元](https://github.com/notofonts/noto-cjk)を参照。buildはSHA-256で入力を固定する。
- ロゴ: 公式サイトの紺・金のブロックマークをBlenderの形状で再現。商略AIの広告用途。

布と髪は元のスキニングを使い、物理シミュレーションは行わない。代表7カットで表情、手首、肩・肘、字幕の重なり、背景を確認する。保存BlendとGLBを独立に読み直し、134骨の主要関節、固定した足、clipを検査する。GLBの構造検査値は `output/shoryaku_promo/reports/validation.json`、MP4の映像・音声トラックは `reports/video.json` を正とする。
