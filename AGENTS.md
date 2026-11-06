# Blender Film Catalog

Blenderで制作する短いCM・ブランドフィルムなど、映像作品をこのリポジトリで公開する。視点やキャラクターを操作する3D空間は `threejs-worlds`、3Dモデルの制作とモデルカタログは `blender-works` が担当する。

映像作品の追加・修正では先に [.agents/skills/blender-animation/SKILL.md](.agents/skills/blender-animation/SKILL.md) を読み、[docs/skills/blender-animation.md](docs/skills/blender-animation.md) の手順に従う。

依頼と無関係な未コミット変更をcommitに混ぜない。Blenderの制作物は `blender-works`、映像カタログはこのリポジトリで別々にcommitする。公開前に表示とbuildを確認する。

依頼された作業は、検証と差分確認を終えた論理単位ごとにcommitし、そのまま設定済みのリモートへpushする。commit・push・既存の公開処理について毎回確認を求めず、CIと公開URLの反映まで確認する。ユーザーがその依頼で「pushしない」「ローカルのみ」などと指定した場合は従う。複数PJの移行では移行先を公開してから旧URLの転送を公開する。失敗は原因を調べ、無関係な変更の追加やforce pushで回避しない。
