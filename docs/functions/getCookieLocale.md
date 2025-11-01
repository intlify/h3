[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getCookieLocale

# Function: getCookieLocale()

```ts
function getCookieLocale(event, __namedParameters?): Locale;
```

get locale from cookie

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | \{ `lang?`: `string`; `name?`: `string`; \} | - |
| `__namedParameters.lang?` | `string` | - |
| `__namedParameters.name?` | `string` | - |

## Returns

`Locale`

The locale that resolved from cookie

## Example

example for h3:

```ts
import { createApp, eventHandler } from 'h3'
import { getCookieLocale } from '@intlify/utils/h3'

app.use(eventHandler(event) => {
  const locale = getCookieLocale(event)
  console.log(locale) // output `Intl.Locale` instance
  // ...
})
```

## Throws

Throws a RangeError if `lang` option or cookie name value are not a well-formed BCP 47 language tag.
