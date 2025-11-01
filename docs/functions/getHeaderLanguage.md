[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getHeaderLanguage

# Function: getHeaderLanguage()

```ts
function getHeaderLanguage(event, __namedParameters?): string;
```

get language from header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | `HeaderOptions` | - |

## Returns

`string`

The **first language tag** of header, if header is not exists, or `*` (any language), return empty string.

## Description

parse header string, default `accept-language`. if you use `accept-language`, this function retuns the **first language tag** of `accept-language` header.

## Example

example for h3:

```ts
import { createApp, eventHandler } from 'h3'
import { getAcceptLanguage } from '@intlify/utils/h3'

const app = createApp()
app.use(eventHandler(event) => {
  const langTag = getHeaderLanguage(event)
  // ...
  return `accepted language: ${langTag}`
})
```
