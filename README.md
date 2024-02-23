# rootsystem.com

## Development

This site is built with [NextJS](https://nextjs.org/docs) and [Chakra UI](https://chakra-ui.com/docs/getting-started), and requires [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) for local development.

```bash
yarn install
yarn run dev

open http://localhost:3000
```

##### TODO 2/23/24

There is a [security vulnerability](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported) that should be addressed at some point. But for now, node `v16.20.0` (lts/gallium) can be used as a workaround.