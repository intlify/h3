[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / DefineLocaleMessage

# Interface: DefineLocaleMessage

The type definition of Locale Message for `@intlify/h3` package

## Example

```ts
// type.d.ts (`.d.ts` file at your app)
import { DefineLocaleMessage } from '@intlify/h3'

declare module '@intlify/h3' {
  export interface DefineLocaleMessage {
    title: string
    menu: {
      login: string
    }
  }
}
```

## Description

The typealias is used to strictly define the type of the Locale message.

## Extends

- `LocaleMessage`\<`string`\>.`ResourceSchema`

## Indexable

```ts
[key: string]: LocaleMessageValue<string>
```

## Properties

| Property | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| <a id="hello"></a> `hello` | `string` | `'hello, {name}'` | - |
| <a id="nest"></a> `nest` | `object` | `undefined` | - |
| `nest.foo` | `object` | `undefined` | - |
| `nest.foo.bar` | `string` | `'bar'` | - |
| <a id="test"></a> `test` | `string` | `undefined` | Define your locale message schema here |
