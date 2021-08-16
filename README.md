# SolidJS svg icon pack

An svg icon pack to use in your projects built with [SolidJS](https://solidjs.com)

## Installation

### Yarn

```bash
yarn add solid-icons
```

### NPM

```bash
npm install solid-icons --save
```

## Usage

```jsx
import { BiCompass } from "solidjs-icons/bi";

<BiCompass color="lavender" size="64px" />;
```

## Included icons pack

| Icon Library                                                       | License                                                                 | Version      |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------ |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://opensource.org/licenses/MIT)                              | 4.0.0        |
| [Bootstrap Icons](https://github.com/twbs/icons)                   | [MIT](https://opensource.org/licenses/MIT)                              | 1.0.0-alpha3 |
| [BoxIcons](https://github.com/atisawd/boxicons)                    | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 2.0.5        |
| [Feather](https://feathericons.com/)                               | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)      | 4.21.0       |
| [Font Awesome](https://fontawesome.com/)                           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 5.12.1       |
| [Heroicons](https://github.com/refactoringui/heroicons)            | [MIT](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)    | 0.4.2        |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 1.0.0        |
| [Ionicons](https://ionicons.com/)                                  | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)       | 4.5.6        |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)            | [Apache License Version 2.0](http://www.apache.org/licenses/)           | 2.3.0        |
| [Simple Icons](https://simpleicons.org/)                           | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | 2.13.0       |
| [Typicons](http://s-ings.com/typicons/)                            | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)         | 2.0.9        |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)      | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)               | 0.0.1        |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)      | [SIL OFL 1.1](http://scripts.sil.org/OFL)                               | 2.0.10       |
| [css.gg](https://github.com/astrit/css.gg)                         | [MIT](https://opensource.org/licenses/MIT)                              | 2.0.0        |

You can add more icons by submitting pull requests or creating issues.

## Configuration

You can configure icons props using

```jsx
import { BiCompass } from "solidjs-icons/bi";

<BiCompass color="lavender" size="64px" className="custom-icon" title="a11y" />;
```

| Key     | Default               | Notes             |
| ------- | --------------------- | ----------------- |
| `color` | `undefined` (inherit) |                   |
| `size`  | `1em`                 |                   |
| `class` | `undefined`           |                   |
| `title` | `undefined`           | A icon title a11y |

## Demo

An example of using this library in this repository:
[PayPal fee calculator](https://github.com/x64Bits/paypal-fee-solid)

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

## CHANGELOG 0.2.1:

- Fix duplicate callback `onClick`
- Fix icon types
- Fixed default stroke/fill (Fill still persists in Heroicons and Ant Design icons pack)

## TODO:

- Fix default Heroicons and Ant Design fill/stroke
- Lib website

Based on :

- [svelte-icons-pack](https://github.com/leshak/svelte-icons-pack)
- [react-icons](https://github.com/react-icons/react-icons)
