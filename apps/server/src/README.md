# src/[moduleName]

- 各機能(Module)単位に分かれている。
- 後述する `_shared` 以外は基本的にはpackage化されていて、境界を超えることはない。

# src/_shared/[moduleName]

- 共通して利用するモジュールの配下
- 各モジュールで使う際は、Providerとして登録してください
  - ex:
    ```ts
    providers: [AuthService, UserService, PrismaService],
     ```

## ディレクトリ構成

```
[moduleName]
├── [moduleName].module.ts # app.module.tsに登録するmodule
├── index.ts
└── core/
    ├── dto/
    │   ├── xxx.dto.ts   # Services層にアクセスするためのモデル
                         # また、変換して際にバリデーションをする
    ├── entity/
    │   ├── xxx.entity.ts
                        # Service層で主に使われるモデル
                        # 現状は、レスポンスとしても使っている
                        # ロジックをservice層で持たずにモデル自身が持つようにする
    │   └── index.ts
    ├── [moduleName].controller.ts
                                   # Presentation層、ロジックは持たない。
                                   # Serviceを呼び出す
    ├── [moduleName].doc.ts # OpenApiの定義
    ├── [moduleName].service.ts
                                # entityの生成や永続化を担当する
                                # 現状はFactoryやRepositoryなどは作っていない
                                # service層の責務が重くなってきたら上記を検討
    └── index.ts
```
