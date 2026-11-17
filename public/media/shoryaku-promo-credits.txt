# 商略AI — 一緒に考えよ？

16秒・1920×1080・24fps・音声なしのVTuber風Blender CM。青いワンピースのオリジナルキャラクターが視聴者に呼びかける。顔のアップ、左右の切り替え、価格のポップ、情報カードの整列、ウインクと手振りを4カットにまとめる。商品情報は[商略AI公式](https://shoryaku.net/)を2026-11-16に確認。月額980円はライトプランの価格。

## 構成

- 0–3秒: 顔のアップと吹き出し。「ねえ、事業の作戦、一緒に考えよ？」。小さな驚きから閉じ目の笑顔へ。
- 3–7秒: 女の子を左へ切り替え、右の大きなカードに「月額980円で使えるマーケティングパートナー」。980の数字が弾み、開いた掌で案内する。
- 7–12秒: 女の子を右へ。「AIが情報を読み取って事業戦略を組み立て。」。案内する手が開くタイミングで3枚の情報カードが整列する。
- 12–16秒: ウインクと手振り。「あなたのマーケティングパートナー。商略AI」。月額とURLを添え、閉じ目の笑顔で終える。

白・淡いブルー・コーラルの配色。ドット、円、星、吹き出しをBlenderのMesh/Curve/Fontで制作する。背景・字幕・カメラも同じGLB clipへ書き出す。カットは短い色帯でつなぎ、点滅を使わない。背景の図は情報整理のイメージであり、実際の画面や成果数値ではない。再生は1回、末尾は静止する。

## 人物

共通の `blue_dress_heroine` のアニメ調の顔を利用。小さい微笑み、閉じ目の笑顔、片目のウインクとまばたきを組み合わせる。顔・肌・目はunlit、髪・服はPBR。`performance.py` は関節間の長軸と掌の法線から腕を解き、手首を折らずに掌の向きを保つ。首と上体の緩やかな動き、既存の髪Boneによる小さい二次動作を加える。発話の口パクや音声は使わない。

## 再生成

`blender-works` を起点に実行する。

```sh
blender -b --python-exit-code 1 -P assets/animations/shoryaku_promo/build.py -- --preview --export
blender -b --python-exit-code 1 -P assets/animations/shoryaku_promo/validate_export.py
blender -b output/shoryaku_promo/blend/shoryaku_promo.blend -s 1 -e 384 -a
python3 assets/animations/shoryaku_promo/finish.py
python3 assets/animations/shoryaku_promo/sync_web.py
```

新しい連番は `output/shoryaku_promo/frames_vtuber/` に保存する。保存Blendは画像とフォントを内包し、文字と背景を編集できる。GLBは文字・曲線をMesh化し、毎フレームの動きを `ShoryakuPromo` clipへ統合。人物の照明の完成形はMP4で、Three.jsでは照明の見え方が異なる。

## 検査

- 全384フレームで手首の向き、肘の可動域、回転の連続性を確認。
- 各カットの文字の投影範囲・高さ、顔の画面占有率を検査し、8枚の代表カットを目視。
- 保存BlendとGLBを独立に読み直し、134骨の主要関節、表情・ウインク、カメラと画面演出、16秒のclip、unlitの顔を照合。
- MP4は1080p・384フレーム・16秒、音声トラックなし。旧連番を混在させない。
- 検査の正本は `reports/validation.json` と `reports/video.json`。合格したGLBのハッシュだけを同期する。

## 素材・権利

- 人物: `blender-works/assets/characters/blue_dress_heroine`。VRoid Studioの標準素体・髪型・衣装・靴。クレジットは `blender-works / VRoid Studio / pixiv Inc.`。[VRoid Studioガイドライン](https://vroid.com/studio/guidelines)と人物READMEに従う。物理演算を用いず、既存リグをキーフレームで制御する。
- 書体: Noto Sans CJK JP Medium、SIL Open Font License 1.1。`FONT-LICENSE.txt`と[公式配布元](https://github.com/notofonts/noto-cjk)を参照。build時に入力SHA-256を検査する。
- 商略AIの名前・訴求: 商略AIの広告用途。
- VTuberの広告に見られる対話的な演出を参考にしたオリジナル構成。第三者のキャラクター、映像、ロゴ、音声を転用しない。
