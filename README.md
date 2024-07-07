

https://github.com/akihisa2359/line-login-demo/assets/25604631/f3a6e615-7d94-406b-8ab5-7ff8feaec79d

## 流れ
1. index.vue
    - ログイン済み
         - プロフィールページへのリンクを表示
    - 未ログイン
        - ログインボタンを表示
2. api/redirect-to-lineへ遷移
    1. csrfトークンを生成してLINE認証画面へリダイレクト
3. ユーザーが認証認可を実行
4. api/line-callbackへリダイレクト
    1. csrfトークンを検証
    2. アクセストークンを取得
    3. ユーザー情報を取得
    4. メモリのセッションストアにユーザー情報を追加
    5. /profileにリダイレクト
5. check-session.global.jsでユーザー情報をNuxtの状態管理に追加
6. profile.vue
  1. 状態管理のユーザー名を表示
  2. ログアウトボタンを表示
7. ログアウト
  1. セッション情報を削除
  2. 状態管理の値をnullにセット
