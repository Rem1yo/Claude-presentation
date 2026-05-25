import type { CollectionConfig } from 'payload'

export const Content: CollectionConfig = {
  slug: 'content',
  access: {
    read: () => true, // Публичный доступ на чтение для фронтенда
  },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true },
    { name: 'value', type: 'text', required: true },
  ],
}