import fs from "fs";
import chalk from "chalk";

import {
  DIST_PATH,
  log,
  includedFiles,
  ROOT_PATH,
  ROOT_EXPORT,
  LIB_PACKAGE_JSON,
  EXPORTS_KEYS,
} from "./constants";
import { indexFileTypes } from "./file-templates";
import { getFileByPath } from "./get-icons";
import { PackageJSONExport, PackAttachedIcons, PackItem } from "./types";


export async function prepareDist() {
  fs.mkdirSync(`${DIST_PATH}/lib`, { recursive: true });
  fs.writeFileSync(`${DIST_PATH}/lib/package.json`, LIB_PACKAGE_JSON);
  fs.writeFileSync(
    `${DIST_PATH}/lib/index.jsx`,
    `const isServer = typeof window === "undefined";

export function IconTemplate(iconSrc, props) {
  return (
    <svg
      ref={(node) => {
        if (!isServer && node) {
          if (!iconSrc._t) {
            const template = document.createElement("template");
            template.innerHTML = \`<svg>\${iconSrc.c}</svg>\`;
            const svgChild = template.content.firstChild;
            const frag = document.createDocumentFragment();
            while (svgChild && svgChild.firstChild) {
              frag.appendChild(svgChild.firstChild);
            }
            iconSrc._t = frag;
          }
          if (props.title) {
            const titleEl = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "title"
            );
            titleEl.textContent = props.title;
            node.appendChild(titleEl);
          }
          node.appendChild(iconSrc._t.cloneNode(true));
        }
      }}
      {...iconSrc.a}
      color={props.color || "currentColor"}
      height={props.size || "1em"}
      width={props.size || "1em"}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...(typeof props.style === "object" ? props.style : {}),
        overflow: "visible",
      }}
      innerHTML={
        isServer
          ? props.title
            ? \`\${iconSrc.c}<title>\${props.title}</title>\`
            : iconSrc.c
          : undefined
      }
      {...props}
    />
  );
}

export const CustomIcon = (props) => {
  return IconTemplate(props.src, props);
};
`
  );
  fs.writeFileSync(`${DIST_PATH}/lib/index.js`, `export * from "./index.jsx";\n`);
  fs.writeFileSync(
    `${DIST_PATH}/lib/index.d.ts`,
    `import type { JSX } from "solid-js";

type SVGSVGElementTags = JSX.SVGElementTags["svg"];

export interface IconTree {
  a: SVGSVGElementTags;
  c: string;
  _t?: DocumentFragment;
}

export interface IconProps extends SVGSVGElementTags {
  size?: string | number;
  color?: string;
  title?: string;
  style?: JSX.CSSProperties;
}

export interface IconBaseProps extends IconProps {
  src: IconTree;
}

export declare type IconTypes = (props: IconProps) => JSX.Element;

export declare const CustomIcon: (props: IconBaseProps) => JSX.Element;

export declare function IconTemplate(
  iconSrc: IconTree,
  props: IconProps
): JSX.Element;
`
  );

  fs.mkdirSync(`${DIST_PATH}/vite`, { recursive: true });
  fs.writeFileSync(
    `${DIST_PATH}/vite/index.js`,
    `import fs from "fs";

export function solidIcons() {
  const cache = new Map();
  return {
    name: "solid-icons-optimizer",
    apply: "serve",
    enforce: "pre",
    transform(code, id) {
      if (!code.includes("solid-icons/")) return null;
      if (id.includes("node_modules") || id.startsWith("/@solid-icons/")) return null;

      const importRegex =
        /import\\s*\\{([^}]+)\\}\\s*from\\s*["']solid-icons\\/([a-zA-Z0-9_-]+)["'];?/g;

      let hasMatch = false;
      const transformed = code.replace(
        importRegex,
        (match, importsStr, pack) => {
          if (pack === "lib" || pack === "vite") return match;
          hasMatch = true;
          const names = importsStr
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          return \`import { \${names.join(", ")} } from "/@solid-icons/\${pack}?names=\${encodeURIComponent(names.join(","))}";\`;
        }
      );

      return hasMatch ? { code: transformed, map: null } : null;
    },
    resolveId(id) {
      if (id.startsWith("/@solid-icons/")) {
        return id;
      }
      return null;
    },
    load(id) {
      if (!id.startsWith("/@solid-icons/")) return null;

      const [pathname, search] = id.replace("/@solid-icons/", "").split("?");
      const pack = pathname;
      const params = new URLSearchParams(search);
      const names = (params.get("names") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (!cache.has(pack)) {
        try {
          const packUrl = new URL(\`../\${pack}/index.js\`, import.meta.url);
          cache.set(pack, fs.readFileSync(packUrl, "utf8"));
        } catch {
          return null;
        }
      }
      const packContent = cache.get(pack);
      if (!packContent) return null;

      const lines = [\`import { IconTemplate } from "solid-icons/lib";\`];
      for (const name of names) {
        const regex = new RegExp(\`export function \${name}\\\\(props\\\\)\\\\{[^\\\\n]+\\\\}\`);
        const match = packContent.match(regex);
        if (match) {
          lines.push(match[0]);
        }
      }

      return lines.join("\\n");
    },
  };
}

export default solidIcons;
`
  );
  fs.writeFileSync(
    `${DIST_PATH}/vite/index.d.ts`,
    `import type { Plugin } from "vite";

export declare function solidIcons(): Plugin;
export default solidIcons;
`
  );

  writeAssetsFiles();

  log(chalk.dim("🍬 Lib artifacts has been bundled") + chalk.green(" ✓"));
}

function getPackageExports(
  previousValue: PackageJSONExport,
  current: PackItem
): PackageJSONExport {
  const exportsTemplate = {
    types: `./${current.shortName}/index.d.ts`,
    solid: `./${current.shortName}/index.jsx`,
    import: `./${current.shortName}/index.js`,
    default: `./${current.shortName}/index.js`,
  };

  const runtimeExports = [
    ...EXPORTS_KEYS.map((key) => ({
      [key]: exportsTemplate,
    })),
    {
      browser: {
        development: exportsTemplate,
        ...exportsTemplate,
      },
      ...exportsTemplate,
    },
  ];

  return {
    ...previousValue,
    [`./${current.shortName}`]: Object.assign({}, ...runtimeExports),
  };
}

function writeAssetsFiles() {
  const packages = JSON.parse(
    fs.readFileSync(new URL("./packages.json", import.meta.url), "utf8")
  ) as PackItem[];

  includedFiles.forEach((file) => {
    fs.cpSync(`${ROOT_PATH}/${file}`, `${DIST_PATH}/${file}`);
  });

  const packageDotJson = JSON.parse(getFileByPath(`${ROOT_PATH}/package.json`));

  delete packageDotJson.devDependencies;
  delete packageDotJson.scripts;
  delete packageDotJson.engines;
  delete packageDotJson.type;
  packageDotJson.main = "./lib/index.jsx";
  packageDotJson.types = "./lib/index.d.ts";
  packageDotJson.module = "./lib/index.jsx";
  packageDotJson.unpkg = "./lib/index.jsx";

  packageDotJson.exports = {
    ["."]: ROOT_EXPORT,
    ["./lib"]: {
      types: "./lib/index.d.ts",
      solid: "./lib/index.jsx",
      import: "./lib/index.jsx",
      default: "./lib/index.jsx",
    },
    ["./vite"]: {
      types: "./vite/index.d.ts",
      import: "./vite/index.js",
      default: "./vite/index.js",
    },
    ...packages.reduce(getPackageExports, {}),
  };

  fs.writeFileSync(
    `${DIST_PATH}/package.json`,
    JSON.stringify(packageDotJson, null, 2)
  );
}

function writeEachPack(pack: PackAttachedIcons) {
  const packFolder = `${DIST_PATH}/${pack.shortName}`;

  fs.mkdirSync(packFolder, { recursive: true });

  for (let index = 0; index < indexFileTypes.length; index++) {
    const type = indexFileTypes[index];
    const fileName = `${packFolder}/${type.fileName}`;
    if ("rawContent" in type && (type as any).rawContent) {
      fs.writeFileSync(fileName, (type as any).rawContent);
    } else if (type.template) {
      const header = type.header ? `${type.header}\n` : "";
      const exports = pack.icons.map((icon) => type.template(icon)).join("\n");
      fs.writeFileSync(fileName, `${header}${exports}\n`);
    }
  }

  log(
    chalk.white(`📦 ${pack.packName}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  );
}

export async function writeLibFiles(iconsPayload: PackAttachedIcons[]) {
  for (let index = 0; index < iconsPayload.length; index++) {
    writeEachPack(iconsPayload[index]);
  }
}
