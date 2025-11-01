[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getQueryLocale

# Function: getQueryLocale()

```ts
function getQueryLocale(event, __namedParameters?): Locale;
```

get the locale from the query

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | the H3Event \| H3 event |
| `__namedParameters?` | `QueryOptions` | - |

## Returns

`Locale`

The locale that resolved from query

## Throws

Throws the RangeError if the language in the query, that is not a well-formed BCP 47 language tag.
