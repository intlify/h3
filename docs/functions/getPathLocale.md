[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getPathLocale

# Function: getPathLocale()

```ts
function getPathLocale(event, __namedParameters?): Locale;
```

get the locale from the path

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | the H3Event \| H3 event |
| `__namedParameters?` | `PathOptions` | - |

## Returns

`Locale`

The locale that resolved from path

## Throws

Throws the RangeError if the language in the path, that is not a well-formed BCP 47 language tag.
