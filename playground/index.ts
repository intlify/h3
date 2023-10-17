import { createServer } from 'node:http'
import { createApp, createRouter, eventHandler, toNodeListener } from 'h3'
import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from '../src/index'

const middleware = defineI18nMiddleware({
  locale: detectLocaleFromAcceptLanguageHeader,
  messages: {
    en: {
      hello: 'hello, {name}',
    },
    ja: {
      hello: 'こんにちは, {name}',
    },
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
