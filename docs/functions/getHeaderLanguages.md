[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getHeaderLanguages

# Function: getHeaderLanguages()

```ts
function getHeaderLanguages(event, __namedParameters?): string[];
```

get languages from header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | `HeaderOptions` | - |

## Returns

`string`[]

The array of language tags, if you use `accept-language` header and `*` (any language) or empty string is detected, return an empty array.

## Description

parse header string, default `accept-language` header

## Example

example for h3:

```ts
import { createApp, eventHandler } from 'h3'
import { getHeaderLanguages } from '@intlify/utils/h3'

const app = createApp()
app.use(eventHandler(event) => {
  const langTags = getHeaderLanguages(event)
  // ...
  return `accepted languages: ${acceptLanguages.join(', ')}`
})
```
