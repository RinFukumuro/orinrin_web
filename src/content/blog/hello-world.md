---
title: "このサイトの構成"
titleEn: "How this website is organized"
date: "2026-11-12"
description: "Next.js、JSON、Markdownを使った個人サイトの構成を紹介します。"
descriptionEn: "A short overview of this site's Next.js, JSON, and Markdown structure."
tags: ["Next.js", "TypeScript"]
---

## サイトについて

オリエンテーリングの地図とWeb制作を紹介する個人サイトです。AIを活用しながら、React・Next.jsによる制作に取り組んでいます。

## ページとコンテンツ

ページはNext.jsのApp Routerで構成しています。日本語は `/ja/`、英語は `/en/` で表示し、共通のレイアウトと翻訳辞書を使っています。

作品・地図・更新履歴はJSON、ブログ本文はMarkdownで管理しています。表示のコードとコンテンツを分け、文章や画像を更新しやすい構成にしています。

## 公開の仕組み

ビルド時に記事やデータを読み込み、HTML・CSS・JavaScriptを `out/` に出力します。記事の追加や変更を公開する際には、再ビルドが必要です。

[ソースコードをGitHubで見る](https://github.com/RinFukumuro/orinrin_web)

<!-- en -->

## About the site

This personal website presents orienteering maps and web projects. I am working on it while learning React and Next.js with AI assistance.

## Pages and content

Pages use the Next.js App Router. Japanese pages are under `/ja/` and English pages under `/en/`, sharing a layout and using separate translation dictionaries.

Projects, maps, and updates are stored in JSON; blog articles are written in Markdown. Keeping content separate from presentation makes text and images easier to update.

## Publishing

The build reads the articles and data and exports HTML, CSS, and JavaScript to `out/`. Content changes require a new build before publishing.

[View the source on GitHub](https://github.com/RinFukumuro/orinrin_web)
