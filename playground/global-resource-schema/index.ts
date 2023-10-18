import { createServer } from 'node:http'
import { createApp, createRouter, eventHandler, toNodeListener } from 'h3'
import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from '../../src/index.ts' // `@inlify/h3`

import en from './locales/en.ts'
import ja from './locales/ja.ts'

// 'en' resource is master schema
type ResourceSchema = typeof en

// you can put the type extending with `declare module` as global resource schema
declare module '../../src/index.ts' {
  export interface I18nResourceSchema extends ResourceSchema {}
}
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
  eventHandler((event) => {
    const t = useTranslation(event)
    return t('hello', { name: 'h3' })
  }),
)

app.use(router)
createServer(toNodeListener(app)).listen(3000)
