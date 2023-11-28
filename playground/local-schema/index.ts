import { createServer } from 'node:http'
import { createApp, createRouter, eventHandler, toNodeListener, use } from 'h3'
import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from '../../src/index.ts' // in your project, `import { ... } from '@inlify/h3'`

import en from './locales/en.ts'
import ja from './locales/ja.ts'

const middleware = defineI18nMiddleware({
  locale: detectLocaleFromAcceptLanguageHeader,
  messages: {
    en,
    ja,
  },
})

const app = createApp({ ...middleware })

const router = createRouter()
router.get(
  '/',
  eventHandler(async (event) => {
    type ResourceSchema = {
      hello: string
    }
    const t = await useTranslation<ResourceSchema>(event)
    return t('hello', { name: 'h3' })
  }),
)

app.use(router)
createServer(toNodeListener(app)).listen(3000)
