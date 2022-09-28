<p align="center">
<img src="https://assets.solidjs.com/banner?project=icons" height="150">
</p>

<h1 align="center">
Solid Icons
</h1>
<p align="center">
Modern solution for use icons on SolidJS
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/solid-icons?activeTab=versions"><img src="https://badgen.net/npm/v/solid-icons"></a>
  <a href="https://github.com/x64Bits/solid-icons/blob/main/LICENSE"><img src="https://badgen.net/npm/license/solid-icons"></a>
  <a href="https://www.npmjs.com/package/solid-icons"><img src="https://badgen.net/npm/dt/solid-icons"></a>
<p>

<p align="center">
 <a href="https://solid-icons.vercel.app/">Icons Explorer</a> | <a href="https://github.com/x64Bits/solid-icons-web">Example</a> 
</p>

<h4 align="center">

</h4>
<br>
<br>

## ✨ Features

- [16 Icon packs](#-included-icons-pack) totally ready to use.
- Compatible with [Solid Start](https://github.com/solidjs/solid-start) static generation and SSR.
- Tree shakeable: What you take is what you get.
- [Customizable](#%EF%B8%8F-configuration) - receive props to extend their usefulness.
- [Reactivity](https://www.youtube.com/watch?v=J70HXl1KhWE), take advantage of SolidJS to react to changes in props.
- [Just import and declare](#usage) in your JSX to work out-the-box
- First class TypeScript support

## 📦 Installation

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
import { SiJavascript } from "solid-icons/si";

<SiJavascript size={24} color="#2c4f7c" />;
```

## 🔋 Included icons pack

| Icon Library                                                       | License                                                                 | Version |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------- |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://opensource.org/licenses/MIT)                              | 4.1.0   |
| [Bootstrap Icons](https://github.com/twbs/icons)                   | [MIT](https://opensource.org/licenses/MIT)                              | 1.7.2   |
| [BoxIcons](https://github.com/atisawd/boxicons)                    | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 2.1.1   |
| [Feather](https://feathericons.com/)                               | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)      | 4.28.0  |
| [Font Awesome](https://fontawesome.com/)                           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 6.1.2  |
| [Heroicons](https://github.com/refactoringui/heroicons)            | [MIT](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)    | 1.0.3   |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 1.0.0   |
| [Ionicons](https://ionicons.com/)                                  | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)       | 5.5.2   |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)            | [Apache License Version 2.0](http://www.apache.org/licenses/)           | 2.5.0   |
| [Simple Icons](https://simpleicons.org/)                           | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | 6.7.0   |
| [Typicons](http://s-ings.com/typicons/)                            | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)         | 2.1.2   |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)      | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)               | 0.0.27  |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)      | [SIL OFL 1.1](http://scripts.sil.org/OFL)                               | 2.0.12  |
| [css.gg](https://github.com/astrit/css.gg)                         | [MIT](https://opensource.org/licenses/MIT)                              | 2.0.0   |
| [Tabler Icons](https://github.com/tabler/tabler-icons)             | [MIT](https://opensource.org/licenses/MIT)                              | 1.70.0  |
| [Github Octicons](https://github.com/primer/octicons)              | [MIT](https://opensource.org/licenses/MIT)                              | 17.3.0  |

## ⚙️ Configuration

solid-icons components receive props like any SVG, you also have a few custom ones.

```jsx
import { SiJavascript } from "solid-icons/si";

<SiJavascript size={24} color="#2c4f7c" class="custom-icon" title="a11y" />;
```

| Key     | Default                  | Notes             |
| ------- | ------------------------ | ----------------- |
| `color` | `currentColor` (inherit) |                   |
| `size`  | `1em`                    |                   |
| `class` | `undefined`              |                   |
| `title` | `undefined`              | A icon title a11y |

## 💻 Development

requirements:

node **^16.14.0**

### Basic build

You can locally clone this repository:

```bash
$ git clone https://github.com/x64Bits/solid-icons
$ cd solid-icons
$ yarn
$ yarn build
```

### Build dev mode

If you did the above steps and want to build while listening if the files change you can run:

```bash
$ yarn dev
```

### Supported arguments

Isolate a single library, this allows you to avoid recompiling the entire library and thus optimize the result of a single one:

```bash
$ yarn dev --isolate="ai"
```

This command is used to build the files destined for web, if you want to change the path, in `src/build/constants.ts` you can modify the output of the files:

```bash
$ yarn dev --web
```

## 📝 Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.
