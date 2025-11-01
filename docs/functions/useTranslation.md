[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / useTranslation

# Function: useTranslation()

```ts
function useTranslation<Schema, Event>(event): Promise<TranslationFunction<Schema, DefineLocaleMessage, ResolveResourceKeys<Schema, DefineLocaleMessage, RemoveIndexSignature<{
[key: string]: LocaleMessageValue<string>;
  hello: string;
  nest: {
     foo: {
        bar: string;
     };
  };
  test: string;
}>, IsEmptyObject<Schema> extends false ? ResourcePath<{ [K in string | number | symbol]: Schema[K] }> : never, _ResourcePath<{
  hello: string;
  nest: {
     foo: {
        bar: string;
     };
  };
  test: string;
}>>>>;
```

use translation function in event handler

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Schema` *extends* `Record`\<`string`, `any`\> | `object` |
| `Event` *extends* `H3Event`\<`EventHandlerRequest`\> | `H3Event`\<`EventHandlerRequest`\> |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `Event` | A h3 event |

## Returns

`Promise`\<`TranslationFunction`\<`Schema`, [`DefineLocaleMessage`](../interfaces/DefineLocaleMessage.md), `ResolveResourceKeys`\<`Schema`, [`DefineLocaleMessage`](../interfaces/DefineLocaleMessage.md), `RemoveIndexSignature`\<\{
\[`key`: `string`\]: `LocaleMessageValue`\<`string`\>;
  `hello`: `string`;
  `nest`: \{
     `foo`: \{
        `bar`: `string`;
     \};
  \};
  `test`: `string`;
\}\>, `IsEmptyObject`\<`Schema`\> *extends* `false` ? `ResourcePath`\<\{ \[K in string \| number \| symbol\]: Schema\[K\] \}\> : `never`, `_ResourcePath`\<\{
  `hello`: `string`;
  `nest`: \{
     `foo`: \{
        `bar`: `string`;
     \};
  \};
  `test`: `string`;
\}\>\>\>\>

Return a translation function, which can be translated with i18n resource messages

## Example

```js
import { createRouter } from 'h3'

const router = createRouter()
router.get(
  '/',
  eventHandler(async (event) => {
    const t = await useTranslation(event)
    return t('hello', { name: 'h3' })
  }),
)
```

## Description

This function must be initialized with defineI18nMiddleware. See about the [defineI18nMiddleware](defineI18nMiddleware.md)
