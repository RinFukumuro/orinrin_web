# Orinrin — Portfolio & Blog

オリエンテーリングの地図、Web制作、学習内容を紹介する個人サイトです。
AIを活用しながら、React / Next.jsによるサイト制作に取り組んでいます。

## 主な機能

- 日本語・英語の切り替え
- 制作物の紹介と画像の拡大表示
- 地図ギャラリー
- Markdownによるブログ記事の管理

## 技術構成

Next.js 16（App Router）/ React 19 / TypeScript / Tailwind CSS 4 / Framer Motion

記事はMarkdown、作品・地図・翻訳はJSONで管理しています。
静的サイトとして出力するため、データベースやアプリケーションサーバーは不要です。

トップページの森の背景画像はAIで生成しています。

## 開発

Node.js 22を使用します。リポジトリのルートで実行してください。

```sh
npm ci
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

```sh
npm run lint          # コード検査
npm run typecheck     # 型チェック
npm run build         # out/ に静的サイトを出力
npm run check:export  # 出力したページとリンクを検査
npm start             # 静的サイトをローカルで確認
```

公開時は `out/` の内容を静的ホスティングに配置します。

## コンテンツの編集

| 内容 | 編集先 |
| --- | --- |
| 自己紹介・翻訳 | `src/data/dictionaries/ja.json`、`en.json` |
| 制作物 | `src/data/projects.json` |
| 地図 | `src/data/maps.json` |
| 更新履歴 | `src/data/news.json` |
| 記事 | `src/content/blog/*.md` |
| 画像 | `public/images/` |

記事の先頭にタイトル・日付・概要・タグを記載します。英語本文は `<!-- en -->` の後に記載します。
既存の記事を形式の参考にしてください。
