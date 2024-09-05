```mermaid
graph TD
Home[ホーム] -->|ログイン| Login[ログイン]
Home -->|サインアップ| Signup[サインアップ]
Login -->|成功| Dashboard[ダッシュボード]
Signup -->|成功| Dashboard
Dashboard --> Settings[設定]
Dashboard -->|ログアウト| Home
Dashboard --> VocabIndex[単語一覧]
VocabIndex --> VocabDetail[単語詳細]
VocabDetail --> |戻る/削除| VocabIndex
Dashboard --> VocabAdd[単語追加]
Dashboard --> VocabTest[単語テスト]
```
