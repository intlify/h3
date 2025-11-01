[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / defineI18nMiddleware

# Function: defineI18nMiddleware()

```ts
function defineI18nMiddleware<Schema, Locales, Message, Options>(options): I18nMiddleware;
```

define i18n middleware for h3

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Schema` | `RemoveIndexSignature`\<\{ \[`key`: `string`\]: `LocaleMessageValue`\<`string`\>; `hello`: `string`; `nest`: \{ `foo`: \{ `bar`: `string`; \}; \}; `test`: `string`; \}\> |
| `Locales` | `string` |
| `Message` | `string` |
| `Options` *extends* `CoreOptions`\<`Message`, `SchemaParams`\<`Schema`, `Message`\>, `LocaleParams`\<`Locales`\>, `LocaleParams`\<`Locales`\> *extends* `object` ? `M` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `LocaleParams`\<`Locales`\> *extends* `object` ? `D` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `LocaleParams`\<`Locales`\> *extends* `object` ? `N` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `M` : `LocaleMessage`\<`string`\>, `SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `D` : `DateTimeFormat`, `SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `N` : `NumberFormat`, `LocaleMessages`\<`SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `M` : `LocaleMessage`\<`string`\>, `LocaleParams`\<`Locales`\> *extends* `object` ? `M` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `Message`\>, `DateTimeFormats`\<`SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `D` : `DateTimeFormat`, `LocaleParams`\<`Locales`\> *extends* `object` ? `D` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`\>, `NumberFormats`\<`SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `N` : `NumberFormat`, `LocaleParams`\<`Locales`\> *extends* `object` ? `N` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`\>\> | `CoreOptions`\<`Message`, `SchemaParams`\<`Schema`, `Message`\>, `LocaleParams`\<`Locales`\>, `LocaleParams`\<`Locales`\> *extends* `object` ? `M` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `LocaleParams`\<`Locales`\> *extends* `object` ? `D` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `LocaleParams`\<`Locales`\> *extends* `object` ? `N` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `M` : `LocaleMessage`\<`string`\>, `SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `D` : `DateTimeFormat`, `SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `N` : `NumberFormat`, `LocaleMessages`\<`SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `M` : `LocaleMessage`\<`string`\>, `LocaleParams`\<`Locales`\> *extends* `object` ? `M` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`, `Message`\>, `DateTimeFormats`\<`SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `D` : `DateTimeFormat`, `LocaleParams`\<`Locales`\> *extends* `object` ? `D` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`\>, `NumberFormats`\<`SchemaParams`\<`Schema`, `Message`\> *extends* `object` ? `N` : `NumberFormat`, `LocaleParams`\<`Locales`\> *extends* `object` ? `N` : `LocaleParams`\<`Locales`\> *extends* `string` ? `string` & `LocaleParams`\<`Locales`\> : `string`\>\> |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Options` | An i18n options like vue-i18n [`createI18n`]([https://vue-i18n.intlify.dev/guide/#javascript](https://vue-i18n.intlify.dev/guide/#javascript)), which are passed to `createCoreContext` of `@intlify/core`, see about details [`CoreOptions` of `@intlify/core`](https://github.com/intlify/vue-i18n-next/blob/6a9947dd3e0fe90de7be9c87ea876b8779998de5/packages/core-base/src/context.ts#L196-L216) |

## Returns

[`I18nMiddleware`](../interfaces/I18nMiddleware.md)

A defined i18n middleware, which is included `onRequest` and `onAfterResponse` options of `createApp`

## Example

```js
import { defineI18nMiddleware } from '@intlify/h3'

const middleware = defineI18nMiddleware({
  messages: {
    en: {
      hello: 'Hello {name}!',
    },
    ja: {
      hello: 'こんにちは、{name}！',
    },
  },
  // your locale detection logic here
  locale: (event) => {
    // ...
  },
})

const app = createApp({ ...middleware })
```

## Description

Define the middleware to be specified for h3 [`createApp`]([https://www.jsdocs.io/package/h3#createApp](https://www.jsdocs.io/package/h3#createApp))
