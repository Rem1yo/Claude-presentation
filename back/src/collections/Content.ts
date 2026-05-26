import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Content: CollectionConfig = {
  slug: 'content',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true },
    { name: 'value', type: 'text', required: true },
  ],
}