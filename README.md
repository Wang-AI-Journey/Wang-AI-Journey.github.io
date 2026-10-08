# Jiacong Wang · Personal Website

王佳聪个人网站：作品、经历、思考、此刻与关于。包含中文 / English 切换、浅色 / 深色主题、项目详情与《西藏，不止在照片里》在线阅读版。

A static personal website with selected work, career experience, essays, current projects, and a bilingual profile.

V2.7 bilingual review completed on 2026-10-08. All 14 HTML pages support Chinese and English. Original book pages and documentary images retain their source language.

## Local preview

Run from this directory:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

## Files and editing

- `index.html`: home page.
- `works/`: work index and project details.
- `journey/`, `ideas/`, `now/`, `about/`: individual sections.
- `assets/`: styles, scripts, images, and reading PDF.

Each bilingual text element uses `data-zh`, `data-en`, and default Chinese text. Keep the default text consistent with `data-zh` when editing.

Image descriptions use `data-alt-zh` / `data-alt-en`; navigation labels use `data-aria-zh` / `data-aria-en`; page descriptions use `data-description-zh` / `data-description-en`. Update both languages together. After changing CSS or JavaScript, update its version query in the HTML files to avoid stale browser caches.

The site uses plain HTML, CSS, and JavaScript. No build step or server application is required. `.nojekyll` allows GitHub Pages to serve these files directly.

## Ownership

Personal photographs, book content, project materials, and third-party logos or product images retain their respective ownership. Public access does not grant permission to reuse these materials.
