[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / CoreContext

# Type Alias: CoreContext\<Message, Messages, DateTimeFormats, NumberFormats, LocaleType, ResourceLocales, Locales\>

```ts
type CoreContext<Message, Messages, DateTimeFormats, NumberFormats, LocaleType, ResourceLocales, Locales> = CoreCommonContext<Message, Locales> & CoreTranslationContext<NonNullable<Messages>, Message> & CoreDateTimeContext<NonNullable<DateTimeFormats>> & CoreNumberContext<NonNullable<NumberFormats>> & object;
```

## Type Declaration

### fallbackContext?

```ts
optional fallbackContext: CoreContext<Message, Messages, DateTimeFormats, NumberFormats, LocaleType, ResourceLocales, Locales>;
```

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Message` | `string` |
| `Messages` | `object` |
| `DateTimeFormats` | `object` |
| `NumberFormats` | `object` |
| `LocaleType` | `Locale` |
| `ResourceLocales` | \| `PickupLocales`\<`NonNullable`\<`Messages`\>\> \| `PickupLocales`\<`NonNullable`\<`DateTimeFormats`\>\> \| `PickupLocales`\<`NonNullable`\<`NumberFormats`\>\> |
| `Locales` | `IsNever`\<`ResourceLocales`\> *extends* `true` ? `LocaleType` *extends* `LocaleDetector` \| `Locale` ? `LocaleType` : `Locale` : `ResourceLocales` |
