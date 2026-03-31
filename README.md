# orinrin_web

おりんりん / Orinrin のポートフォリオ・ブログサイト。

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion で構築。静的エクスポート (`output: "export"`) によるホスティング対応。日本語 / 英語の多言語対応。

---

## ディレクトリ構造

```
orinrin_web/
├── public/                          # 静的ファイル（そのまま配信される）
│   └── images/
│       ├── IMG_7488.jpg             # トップページのヒーロー背景画像
│       ├── porfolio1.png            # ポートフォリオ用画像（元ファイル）
│       ├── maps/
│       │   ├── map1.jpg             # 地図画像: 晴海
│       │   ├── map2.jpg             # 地図画像: 四谷荒木町
│       │   └── map3.jpg             # 地図画像: 六本木ヒルズ
│       └── projects/
│           └── project-1/
│               ├── thumb.png        # サムネイル画像
│               ├── screenshot-1.png # スクリーンショット 1
│               └── screenshot-2.png # スクリーンショット 2
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # ルートレイアウト（フォント設定、メタデータ）
│   │   ├── page.tsx                 # / → デフォルトロケールにリダイレクト
│   │   ├── globals.css              # グローバルCSS（テーマ変数、アニメーション、スクロールバー）
│   │   └── [locale]/                # ロケール別ルート (/ja, /en)
│   │       ├── layout.tsx           # ロケールレイアウト（Header, Footer を含む）
│   │       ├── page.tsx             # トップページ（ヒーロー + 地図ギャラリー + ニュース）
│   │       ├── blog/
│   │       │   ├── page.tsx         # ブログ記事一覧ページ
│   │       │   └── [slug]/
│   │       │       └── page.tsx     # ブログ記事詳細ページ
│   │       ├── contact/
│   │       │   └── page.tsx         # お問い合わせページ（フォーム + X リンク）
│   │       ├── maps/
│   │       │   └── [id]/
│   │       │       └── page.tsx     # 地図詳細ページ（個別の地図を大きく表示）
│   │       └── portfolio/
│   │           └── page.tsx         # ポートフォリオ一覧 + 地図セクション
│   │
│   ├── components/
│   │   ├── blog/
│   │   │   ├── ArticleCard.tsx      # ブログ記事カード（一覧表示用）
│   │   │   └── MarkdownRenderer.tsx # Markdown → HTML レンダラー
│   │   ├── contact/
│   │   │   └── ContactForm.tsx      # お問い合わせフォーム（Formspree連携）
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx      # ヒーローセクション（シネマティック演出、タイプライター＋バウンス）
│   │   │   ├── GeometricCanvas.tsx  # 風＋葉のCanvasアニメーション
│   │   │   └── FloatingMaps.tsx     # ヒーロー背景に浮かぶ地図カード
│   │   ├── layout/
│   │   │   ├── Header.tsx           # ヘッダーナビ（デスクトップ＋モバイルメニュー、言語切替）
│   │   │   └── Footer.tsx           # フッター（著作権、GitHub/X リンク）
│   │   ├── portfolio/
│   │   │   ├── AutoScrollGallery.tsx # 自動＋手動スクロール地図ギャラリー
│   │   │   ├── ProjectGrid.tsx      # プロジェクトカードのグリッド表示
│   │   │   ├── ProjectCard.tsx      # プロジェクトカード単体
│   │   │   └── ImageLightbox.tsx    # 画像のライトボックス（拡大表示）
│   │   └── ui/
│   │       ├── PageTransition.tsx   # ページ遷移フェードアニメーション
│   │       └── ScrollReveal.tsx     # スクロール連動フェードインアニメーション
│   │
│   ├── content/
│   │   └── blog/
│   │       └── hello-world.md       # ブログ記事（Markdownファイル）
│   │
│   ├── data/
│   │   ├── dictionaries/
│   │   │   ├── ja.json              # 日本語の翻訳辞書
│   │   │   └── en.json              # 英語の翻訳辞書
│   │   ├── maps.json                # 地図データ（ID、画像パス、タイトル、説明）
│   │   ├── news.json                # ニュース・更新履歴データ
│   │   └── projects.json            # ポートフォリオプロジェクトデータ
│   │
│   ├── lib/
│   │   ├── blog.ts                  # ブログ記事の読み込み・Markdownパース
│   │   ├── projects.ts              # プロジェクトデータの読み込み
│   │   └── i18n/
│   │       ├── config.ts            # ロケール設定 (ja, en)
│   │       └── dictionaries.ts      # 辞書ローダー（Dictionary型の定義）
│   │
│   └── types/
│       ├── blog.ts                  # BlogPost 型定義
│       └── project.ts               # Project, ProjectImage 型定義
│
├── next.config.ts                   # Next.js設定（静的エクスポート、画像最適化無効）
├── tsconfig.json                    # TypeScript設定（パスエイリアス @/* → ./src/*）
├── postcss.config.mjs               # PostCSS設定（Tailwind CSS v4）
├── eslint.config.mjs                # ESLint設定
├── package.json                     # 依存パッケージ・スクリプト
└── package-lock.json                # 依存パッケージのロックファイル
```

---

## データの編集方法

### ブログ記事を追加する

`src/content/blog/` に Markdown ファイルを作成:

```markdown
---
title: "記事タイトル"
titleEn: "English Title"
date: "2026-04-01"
description: "概要"
descriptionEn: "English description"
tags: ["Tag1", "Tag2"]
---

本文をMarkdownで記述
```

### 地図を追加・編集する

1. 画像を `public/images/maps/` に配置
2. `src/data/maps.json` にエントリを追加

### ニュースを追加する

`src/data/news.json` に追加:

```json
{
  "date": "2026-04-01",
  "title": {
    "ja": "日本語タイトル",
    "en": "English title"
  }
}
```

### ポートフォリオを追加する

1. 画像を `public/images/projects/<id>/` に配置
2. `src/data/projects.json` にエントリを追加

### 翻訳を編集する

`src/data/dictionaries/ja.json` / `en.json` を編集。

---

## 開発

```bash
npm install      # 依存パッケージのインストール
npm run dev      # 開発サーバー起動
npm run build    # 静的サイトビルド
```
