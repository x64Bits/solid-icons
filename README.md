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
import { TbBrandSolidjs } from "solid-icons/tb";

<TbBrandSolidjs size={24} color="#2c4f7c" />;
```

## Custom icon

There are situations where you want to use your own set of icons, CustomIcon is a component exposed from the library that uses the IconTemplate that all the icons in the library already use. (Thanks [kdaquila](https://github.com/kdaquila) for the example).

```jsx
import { CustomIcon } from "solid-icons/lib";

const iconContent = {
  a: { fill: "currentColor", viewBox: "0 0 384 512" },
  c: '<path d="M384 319.1C384 425.9 297.9 512 192 512S0 425.87 0 320c0-58.67 27.82-106.8 54.57-134.1C69.54 169.3 96 179.8 96 201.5V287c0 35.17 27.97 64.5 63.16 64.94C194.9 352.5 224 323.6 224 288c0-88-175.1-96.12-52.15-277.2C185.35-8.92 216 .03 216 23.83 215.1 127 384 149.7 384 319.1z"/>',
}

<CustomIcon src={iconContent} size={24} color="#2c4f7c" />;
```

### Props

| Key     | Default     | Notes                                                                                            |
| ------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `src`   | required    | format: `a` Attributes needed for the svg like `viewBox`, `c`: svg content, look at the example. |
| `size`  | `1em`       |                                                                                                  |
| `class` | `undefined` |                                                                                                  |
| `title` | `undefined` | A icon title a11y                                                                                |

## 🔋 Included icons pack

| Icon Library                                                       | License                                                                 | Version | Abbreviation |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------- | ------------ |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://opensource.org/licenses/MIT)                              | 4.2.1   | ai           |
| [Bootstrap Icons](https://github.com/twbs/icons)                   | [MIT](https://opensource.org/licenses/MIT)                              | 1.10.5  | bs           |
| [BoxIcons](https://github.com/atisawd/boxicons)                    | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 2.1.4   | bi           |
| [Feather](https://feathericons.com/)                               | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)      | 4.29.0  | fi           |
| [Font Awesome](https://fontawesome.com/)                           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 6.4.0   | fa           |
| [Heroicons](https://github.com/refactoringui/heroicons)            | [MIT](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)    | 2.0.18  | hi           |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)           | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)       | 1.0.0   | im           |
| [Ionicons](https://ionicons.com/)                                  | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)       | 7.1.2   | io           |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)            | [Apache License Version 2.0](http://www.apache.org/licenses/)           | 3.3.0   | ri           |
| [Simple Icons](https://simpleicons.org/)                           | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | 9.0.0   | si           |
| [Typicons](http://s-ings.com/typicons/)                            | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)         | 2.1.2   | ti           |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)      | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)               | 0.0.32  | vs           |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)      | [SIL OFL 1.1](http://scripts.sil.org/OFL)                               | 2.0.12  | wi           |
| [css.gg](https://github.com/astrit/css.gg)                         | [MIT](https://opensource.org/licenses/MIT)                              | 2.0.0   | cg           |
| [Tabler Icons](https://github.com/tabler/tabler-icons)             | [MIT](https://opensource.org/licenses/MIT)                              | 2.20.0  | tb           |
| [Github Octicons](https://github.com/primer/octicons)              | [MIT](https://opensource.org/licenses/MIT)                              | 19.1.0  | oc           |

## ⚙️ Configuration

solid-icons components receive props like any SVG, you also have a few custom ones.

```jsx
import { TbBrandSolidjs } from "solid-icons/tb";

<TbBrandSolidjs size={24} color="#2c4f7c" class="custom-icon" title="a11y" />;
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
