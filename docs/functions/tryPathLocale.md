[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / tryPathLocale

# Function: tryPathLocale()

```ts
function tryPathLocale(event, __namedParameters?): Locale | null;
```

try to get the locale from the path

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | the H3Event \| H3 event |
| `__namedParameters?` | `PathOptions` | - |

## Returns

`Locale` \| `null`

The locale that resolved from path. if the language in the path, that is not a well-formed BCP 47 language tag, return `null`.

## Description

Unlike [getPathLocale](getPathLocale.md), this function does not throw an error if the locale cannot be obtained, this function returns `null`.
