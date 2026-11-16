# 商略AI — マーケティングパートナー

12秒・1920×1080・24fps・音声なしのBlender CM。青いワンピースの女の子を大きく配置し、2つの短いコピーで伝える。商品情報は[商略AI公式](https://shoryaku.net/)を2026-11-16に確認。月額980円はライトプランの価格であり、全プラン共通の価格ではない。

## 構成

- 0–6秒: 「月額980円で使える」「マーケティング」「パートナー」。女の子が微笑み、背景で金色と青色の弧・光の粒が動く。
- 6–12秒: 「AIが情報を読み取って」「事業戦略を」「組み立て。」。上半身を大きく保ちながらわずかに寄り、粒が3列に整う。笑顔とこのコピーで終える。

画面内の補助テキストは商略AIの名前とURLだけ。無料体験、機能一覧、フレームワーク名などは表示しない。文字は大きさを保って短くスライドし、長く読める状態で保持する。背景の図形は情報を整理するイメージで、実際の画面・成果数値を表さない。再生は1回、末尾は静止し、ループへ接続しない。

## 人物

共通の `blue_dress_heroine` のアニメ調の顔を利用する。中立は閉じた小さい微笑み、笑う場面は弧を描く閉じた目と控えめな口。顔・肌・目はunlit、髪・服はPBR。淡い頬色を持ち、鼻の光沢や前髪の硬い影を抑える。`performance.py` は肩→肘→手首と指の付け根の軸から掌を制御する。12秒に合わせて動作を再配置する。

## 再生成

`blender-works` を起点に実行する。

```sh
blender -b --python-exit-code 1 -P assets/animations/shoryaku_promo/build.py -- --preview --export
blender -b --python-exit-code 1 -P assets/animations/shoryaku_promo/validate_export.py
blender -b output/shoryaku_promo/blend/shoryaku_promo.blend -s 1 -e 288 -a
python3 assets/animations/shoryaku_promo/finish.py
python3 assets/animations/shoryaku_promo/sync_web.py
```

旧20秒版の連番と混在しないよう、新しい連番は `output/shoryaku_promo/frames_partner/` に保存する。保存Blendは画像とフォントを内包し、文字、人物、カメラ、背景の演出を編集できる。GLBは文字・曲線をMesh化し、毎フレームの動きを `ShoryakuPromo` clipへまとめる。色・照明の完成形はMP4で、Three.jsでは照明の見え方が異なる。

## 検査

- 全288フレームで手首の向き、肘の可動域、回転の連続性を確認。
- 文字の投影範囲・高さと、顔の画面占有率を検査し、代表7カットで文字と人物の重なりを目視。
- 保存BlendとGLBを独立に読み直し、134骨の主要関節、表情値、12秒のclip、unlitの顔材質を照合。
- MP4は1080p・288フレーム・12秒で、音声トラックを含まないことを確認。
- 正本は `reports/validation.json` と `reports/video.json`。検査に合格したGLBのハッシュだけを同期する。

## 素材・権利

- 人物: `blender-works/assets/characters/blue_dress_heroine`。VRoid Studioの標準素体・髪型・衣装・靴を使用。クレジットは `blender-works / VRoid Studio / pixiv Inc.`。[VRoid Studioガイドライン](https://vroid.com/studio/guidelines)と人物READMEに従う。髪・衣装はスキニングで動き、物理演算は行わない。
- 書体: Noto Sans CJK JP Medium、SIL Open Font License 1.1。`FONT-LICENSE.txt`と[公式配布元](https://github.com/notofonts/noto-cjk)を参照。buildは入力のSHA-256を検査する。
- 商略AIの名前・訴求: 商略AIの広告用途。
