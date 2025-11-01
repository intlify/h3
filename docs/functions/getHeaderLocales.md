[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getHeaderLocales

# Function: getHeaderLocales()

```ts
function getHeaderLocales(event, __namedParameters?): Locale[];
```

get locales from header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | `HeaderOptions` | - |

## Returns

`Locale`[]

The locales that wrapped from header, if you use `accept-language` header and `*` (any language) or empty string is detected, return an empty array.

## Description

wrap language tags with Intl.Locale \| locale, languages tags will be parsed from `accept-language` header as default.

## Example

example for h3:

```ts
import { createApp, eventHandler } from 'h3'
import { getHeaderLocales } from '@intlify/utils/h3'

app.use(eventHandler(event) => {
  const locales = getHeaderLocales(event)
  // ...
  return `accepted locales: ${locales.map(locale => locale.toString()).join(', ')}`
})
```

## Throws

Throws the RangeError if header are not a well-formed BCP 47 language tag.
