# @intlify/h3

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![CI][ci-src]][ci-href]

Internationalization middleware & utilities for h3

## 🌟 Features

✅️ &nbsp;**Translation:** Simple API like
[vue-i18n](https://vue-i18n.intlify.dev/)

✅ &nbsp;**Custom locale detector:** You can implement your own locale detector
on server-side

✅️️ &nbsp;**Useful utilities:** support internationalization composables
utilities via [@intlify/utils](https://github.com/intlify/utils)

## 💿 Installation

```sh
# Using npm
npm install @intlify/h3

# Using yarn
yarn add @intlify/h3

# Using pnpm
pnpm add @intlify/h3

# Using bun
bun add @intlify/h3
```

## 🚀 Usage

```ts
import { createServer } from 'node:http'
import { createApp, createRouter, eventHandler, toNodeListener } from 'h3'
import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from '@intlify/h3'

// define middleware with vue-i18n like options
const middleware = defineI18nMiddleware({
  // detect locale with `accept-language` header
  locale: detectLocaleFromAcceptLanguageHeader,
  // resource messages
  messages: {
    en: {
      hello: 'Hello {name}!',
    },
    ja: {
      hello: 'こんにちは、{name}！',
    },
  },
  // something options
  // ...
})

// install middleware with `createApp` option
const app = createApp({ ...middleware })

const router = createRouter()
router.get(
  '/',
  eventHandler((event) => {
    // use `useTranslation` in event handler
    const t = useTranslation(event)
    return t('hello', { name: 'h3' })
  }),
)

app.use(router)
createServer(toNodeListener(app)).listen(3000)
```

## 🛠️ Custom locale detection

You can detect locale with your custom logic from current `H3Event`.

example for detecting locale from url query header:

```ts
import { defineI18nMiddleware, getQueryLocale } from '@intlify/h3'
import type { H3Event } from 'h3'

const DEFAULT_LOCALE = 'en'

// define custom locale detector
const localeDetector = (event: H3Event): string => {
  try {
    return getQueryLocale(event).toString()
  } catch () {
    return DEFAULT_LOCALE
  }
}

const middleware = defineI18nMiddleware({
  // set your custom locale detector
  locale: localeDetector,
  // something options
  // ...
})
```

## 🛠️ Utilites & Helpers

`@intlify/h3` has a concept of composable utilities & helpers.

### Utilities

`@intlify/h3` composable utilities accept event (from
`eventHandler((event) => {})`) as their first argument. (Exclud
`useTranslation`) return the
[`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)

### Translations

- `useTranslation(event)`: use translation function

### Headers

- `getHeaderLocale(event)`: get locale from `accept-language` header
- `getHeaderLocales(event)`: get some locales from `accept-language` header

### Cookies

- `getCookieLocale()`: get locale from cookie
- `setCookieLocale()`: set locale to cookie

### Misc

- `getPathLocale(event)`: get locale from path
- `getQueryLocale(event)`: get locale from query

## Helpers

- `detectLocaleFromAcceptLanguageHeader`: detect locale from `accept-language`
  header

## 🙌 Contributing guidelines

If you are interested in contributing to `@intlify/h3`, I highly recommend
checking out [the contributing guidelines](/CONTRIBUTING.md) here. You'll find
all the relevant information such as
[how to make a PR](/CONTRIBUTING.md#pull-request-guidelines),
[how to setup development](/CONTRIBUTING.md#development-setup)) etc., there.

## ©️ License

[MIT](http://opensource.org/licenses/MIT)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@intlify/h3?style=flat&colorA=18181B&colorB=FFAD33
[npm-version-href]: https://npmjs.com/package/@intlify/h3
[npm-downloads-src]: https://img.shields.io/npm/dm/@intlify/h3?style=flat&colorA=18181B&colorB=FFAD33
[npm-downloads-href]: https://npmjs.com/package/@intlify/h3
[ci-src]: https://github.com/intlify/utils/actions/workflows/ci.yml/badge.svg
[ci-href]: https://github.com/intlify/utils/actions/workflows/ci.yml
