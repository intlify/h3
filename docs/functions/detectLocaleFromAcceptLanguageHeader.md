[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / detectLocaleFromAcceptLanguageHeader

# Function: detectLocaleFromAcceptLanguageHeader()

```ts
function detectLocaleFromAcceptLanguageHeader(event): string;
```

locale detection with `Accept-Language` header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | A h3 event |

## Returns

`string`

A locale string, which will be detected of **first** from `Accept-Language` header

## Example

```js
import { createApp } from 'h3'
import { defineI18nMiddleware, detectLocaleWithAcceeptLanguageHeader } from '@intlify/h3'

const middleware = defineI18nMiddleware({
  messages: {
    en: {
      hello: 'Hello {name}!',
    },
    ja: {
      hello: 'こんにちは、{name}！',
    },
  },
  locale: detectLocaleWithAcceeptLanguageHeader
})

const app = createApp({ ...middleware })
```
