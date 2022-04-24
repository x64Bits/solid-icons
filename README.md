# The standard for using icons in SolidJS

An svg icon pack to use in your projects built with [SolidJS](https://solidjs.com)

14156 icons ready to use [Icons explorer](https://solid-icons-web.vercel.app/)

This library is based on the work of:

- [svelte-icons-pack](https://github.com/leshak/svelte-icons-pack)
- [react-icons](https://github.com/react-icons/react-icons)

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
import { BiCompass } from "solid-icons/bi";

<BiCompass color="lavender" size="64px" />;
```

## Included icons pack

| Icon Library                                                       | License                                                                 | Version |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------- |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://opensource.org/licenses/MIT)                              | 4.1.0   |
| [Bootstrap Icons](https://github.com/twbs/icons)                   | [MIT](https://opensource.org/licenses/MIT)                              | 1.7.2   |
| [BoxIcons](https://github.com/atisawd/boxicons)                    | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 2.1.1   |
| [Feather](https://feathericons.com/)                               | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)      | 4.28.0  |
| [Font Awesome](https://fontawesome.com/)                           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 5.15.4  |
| [Heroicons](https://github.com/refactoringui/heroicons)            | [MIT](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)    | 1.0.3   |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 1.0.0   |
| [Ionicons](https://ionicons.com/)                                  | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)       | 5.5.2   |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)            | [Apache License Version 2.0](http://www.apache.org/licenses/)           | 2.5.0   |
| [Simple Icons](https://simpleicons.org/)                           | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | 6.7.0   |
| [Typicons](http://s-ings.com/typicons/)                            | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)         | 2.1.2   |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)      | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)               | 0.0.27  |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)      | [SIL OFL 1.1](http://scripts.sil.org/OFL)                               | 2.0.12  |
| [css.gg](https://github.com/astrit/css.gg)                         | [MIT](https://opensource.org/licenses/MIT)                              | 2.0.0   |

You can add more icons by submitting pull requests or creating issues.

## Configuration

You can configure icons props using

```jsx
import { BiCompass } from "solid-icons/bi";

<BiCompass color="lavender" size="64px" className="custom-icon" title="a11y" />;
```

| Key     | Default                  | Notes             |
| ------- | ------------------------ | ----------------- |
| `color` | `currentColor` (inherit) |                   |
| `size`  | `1em`                    |                   |
| `class` | `undefined`              |                   |
| `title` | `undefined`              | A icon title a11y |

## Demo

An example of using this library in this repository:
[PayPal fee calculator](https://github.com/x64Bits/paypal-fee-solid)

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

## Known issues:

- Ionicons: Most of the icons in this pack work fine but some with outline features have trouble displaying.
