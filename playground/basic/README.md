# `intlify-h3-basic` playground

This playground is translation with `accept-language` header.

## Usage

```sh
npm run dev
```

and then, you try to access to `http://localhost:3000` with `accept-language` header with another
shell:

```sh
curl -H 'Accept-Language: ja,en-US;q=0.7,en;q=0.3' http://localhost:3000
```
