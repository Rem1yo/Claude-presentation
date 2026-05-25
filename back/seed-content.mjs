import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const items = [
  { key: 'nav-logo',           value: 'DevTools' },
  { key: 'hero-badge',         value: '🤖 AI Developer Toolkit' },
  { key: 'hero-title-1',       value: '5 инструментов' },
  { key: 'hero-title-2',       value: 'которые меняют разработку' },
  { key: 'hero-desc',          value: 'CLAUDE.md · Superpowers · Context7 · Architecture · SDLC — всё в одном интерактивном гайде.' },
  { key: 'rules-badge',        value: '01 / Написание правил' },
  { key: 'rules-title',        value: 'Как писать правила для Claude' },
  { key: 'rules-desc',         value: 'CLAUDE.md — это файл с инструкциями, который Claude читает при каждом старте сессии. Умные правила экономят сотни промтов.' },
  { key: 'superpowers-badge',  value: '02 / Claude Superpowers' },
  { key: 'superpowers-title',  value: 'Суперсилы Claude' },
  { key: 'superpowers-desc',   value: 'Наведи на карточку — откроется практический совет разработчика.' },
  { key: 'context7-badge',     value: '03 / Context7' },
  { key: 'context7-title',     value: 'Что такое Context7?' },
  { key: 'context7-desc',      value: 'Context7 — MCP-сервер, который подаёт Claude актуальную документацию библиотек прямо в промт. Без него Claude отвечает по данным обучения — которые могут быть устаревшими.' },
  { key: 'arch-badge',         value: '04 / Фундаментальное проектирование' },
  { key: 'arch-title',         value: 'Архитектура AI-приложения' },
  { key: 'arch-desc',          value: 'Нажми на любой модуль — увидишь его роль и технологический стек.' },
  { key: 'sdlc-badge',         value: '05 / SDLC & AI Tools' },
  { key: 'sdlc-title',         value: 'SDLC с ИИ-инструментами' },
  { key: 'sdlc-desc',          value: 'Нажми на шаг — увидишь, какие инструменты применяются и как они ускоряют процесс.' },
  { key: 'footer-text',        value: 'Создано с ❤️ и 🤖 · AI DevTools Showcase · 2025' },
]

const payload = await getPayload({ config })

for (const item of items) {
  const existing = await payload.find({
    collection: 'content',
    where: { key: { equals: item.key } },
    limit: 1,
  })
  if (existing.totalDocs === 0) {
    await payload.create({ collection: 'content', data: item })
    console.log(`✓ created: ${item.key}`)
  } else {
    console.log(`– skip (exists): ${item.key}`)
  }
}

console.log('Done.')
process.exit(0)
