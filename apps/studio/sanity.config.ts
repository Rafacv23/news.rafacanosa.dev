import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {seoMetaFields} from 'sanity-plugin-seo'

export default defineConfig({
  name: 'default',
  title: 'news.rafacanosa.dev',

  projectId: 'd5wqbyn6',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), seoMetaFields()],

  schema: {
    types: schemaTypes,
  },
})
