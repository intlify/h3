[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / setCookieLocale

# Function: setCookieLocale()

```ts
function setCookieLocale(
   event, 
   locale, 
   options?): void;
```

set locale to the response `Set-Cookie` header.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `locale` | `string` \| `Locale` | The locale value |
| `options?` | `CookieOptions` | The cookie options, `name` option is `i18n_locale` as default, and `path` option is `/` as default. |

## Returns

`void`

## Example

example for h3:

```ts
import { createApp, eventHandler } from 'h3'
import { getCookieLocale } from '@intlify/utils/h3'

app.use(eventHandler(event) => {
  setCookieLocale(event, 'ja-JP')
  // ...
})
```

## Throws

Throws the SyntaxError if `locale` is invalid.
