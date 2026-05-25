# Проект: AI DevTools Showcase

## Структура проекта

```
/projects
├── index.html          # Фронтенд (SPA-сайт-презентация)
├── Makefile            # Команды управления
├── docker-compose.yml  # Docker для бэкенда (упрощённый, hardcoded defaults)
├── Dockerfile          # Dockerfile для рутового docker-compose (dev-режим)
└── back/               # Бэкенд — Payload CMS + Next.js
    ├── Dockerfile          # Dockerfile для back/ (dev-режим, без npm run build)
    ├── docker-compose.yml  # Docker для бэкенда (правильный, с healthcheck и .env)
    ├── .env                # Переменные окружения бэкенда
    └── src/
        ├── app/            # Next.js App Router
        ├── collections/    # Payload коллекции (Content, Pages, Posts, Users, Media, Categories)
        ├── blocks/         # Блоки контента
        ├── heros/          # Hero-компоненты
        ├── components/     # UI-компоненты
        ├── utilities/      # Вспомогательные утилиты
        └── payload.config.ts
```

---

## Команды (Makefile)

| Команда | Действие |
|---|---|
| `make run` | Открыть `index.html` локально |
| `make save msg="текст"` | git add + commit + push |
| `make b-up` | Запустить бэкенд в фоне (`back/docker-compose.yml`) |
| `make b-down` | Остановить и удалить контейнеры бэкенда |
| `make b-logs` | Логи API в реальном времени |

Альтернатива через рутовый docker-compose (без `cd back`):
```bash
docker compose up --build     # запустить
docker compose down           # остановить
```

---

## Бэкенд: Payload CMS + PostgreSQL

- **Стек:** Payload CMS v3, Next.js 16 (Turbopack), PostgreSQL 15/16
- **Порт:** `localhost:3000` — фронт и API Payload
- **Admin panel:** `localhost:3000/admin`
- **Запуск:** `make b-up` или `docker compose up --build` из корня

### Docker-конфигурации

**`back/docker-compose.yml`** (рекомендуемый):
- Читает переменные из `back/.env`
- Healthcheck для PostgreSQL перед стартом API
- `depends_on: condition: service_healthy`

**`docker-compose.yml`** (в корне):
- Захардкоженные дефолты (nestuser/nestpassword/nestdb)
- Без healthcheck (API стартует сразу, может не дождаться БД)

### Важные технические нюансы

1. **Dockerfile — dev-режим без билда.** `back/Dockerfile` запускает `npm run dev`, а не `npm run build`. Это критично: при `npm run build` Next.js пытается статически сгенерировать страницы и падает, потому что БД ещё недоступна во время Docker-сборки.

2. **`generateStaticParams` в try-catch.** Все три страницы с `generateStaticParams` (`[slug]/page.tsx`, `posts/[slug]/page.tsx`, `posts/page/[pageNumber]/page.tsx`) обёрнуты в try-catch — возвращают `[]` если БД недоступна. Страницы рендерятся на лету в runtime.

3. **`force-dynamic` на всех frontend-страницах.** Все страницы в `app/(frontend)/` имеют `export const dynamic = 'force-dynamic'` — запрещает статическую пре-рендеризацию при билде.

4. **Импорты — только через `@/`.** Запрещено использовать `src/` как префикс в импортах. Правильно: `@/utilities/formatDateTime`, `@/payload-types`.

5. **Кириллица в именах файлов — смерть.** Голосовой ввод может создать файл `Сontent.ts` с кириллической **С** вместо латинской **C** — TypeScript не найдёт. Всегда проверяй имена коллекций.

---

## Фронтенд: index.html (SPA-сайт-презентация)

- **Тип:** Single Page Application — весь код строго в одном файле `index.html`
- **Стек:** HTML5 + Vanilla JavaScript + Tailwind CSS (CDN)
- **Тема:** тёмная, неоновые акценты через CSS-переменные (`--cyan`, `--purple`, `--green`)
- **Шрифт:** `'Segoe UI', system-ui, -apple-system, sans-serif` — везде, включая SVG
- **Открыть:** `make run` или просто открыть файл в браузере

---

## Правила написания кода

1. **Никаких заглушек.** Всегда пиши полный рабочий код. Запрещено оставлять `// здесь ваш код`, `// остальной код` и аналоги.
2. **Один файл (фронтенд).** Запрещено создавать отдельные `.js` или `.css` файлы без прямой инструкции.
3. **Без фреймворков (фронтенд).** Только Vanilla JS — никакого React, Vue, jQuery.
4. **Обработка ошибок.** Любой `fetch` оборачивать в `try/catch` с понятным UI-уведомлением.
5. **Безопасность.** API-ключи только из `localStorage.getItem(...)`. Никогда не хардкодить.
6. **Комментарии.** Только если причина неочевидна. Не объяснять «что» делает код.
7. **Отступы:** 2 пробела.

---

## Использование Context7

При работе с библиотеками (Tailwind, Prisma, Next.js, Payload и др.) добавляй `use context7` в конец промта — это подтягивает актуальную документацию и исключает устаревшие API.

```
"Напиши компонент с новым API Tailwind v4. use context7"
```

---

## Дизайн-система (фронтенд)

```css
--cyan:   #00f5ff   /* основной акцент, заголовки */
--purple: #bf00ff   /* вторичный акцент */
--green:  #00ff88   /* успех, позитивные индикаторы */
--pink:   #ff00aa   /* деплой, яркие элементы */
--orange: #ff9900   /* предупреждения */
--blue:   #3b82f6   /* поддержка, мониторинг */
```

- Карточки: `background: #0f172a`, `border: 1px solid rgba(255,255,255,.07)`
- Hover: `transform: translateY(-7px)` + цветной `box-shadow`
- Анимации через CSS `transition`, не через JS
