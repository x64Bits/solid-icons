var cheerio = require("cheerio");
if (typeof cheerio != "function") cheerio = require("cheerio").default;
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const chalk = require("chalk");

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);

let totalCount = 0;

const {
  templateType,
  WEB_DIR,
  PACKAGE_JSON_PACK,
  OUT_DIR,
} = require("./constants");

// Utils
const {
  generateSearchFile,
  makeIconFile,
  generateMetaPackFile,
} = require("./files");

const viewBoxes = {
  bi: "0 0 24 24",
  vsc: "0 0 16 16",
};

const _rootDir = path.resolve(__dirname, "../");

const projectPath = path.resolve(__dirname, "../");

// LICENSE
const licenseFrom = path.resolve(projectPath, "LICENSE");
const licenseTo = path.resolve(OUT_DIR, "LICENSE");

// README.md
const readmeFrom = path.resolve(projectPath, "README.md");
const readmeTo = path.resolve(OUT_DIR, "README.md");

// Manifest
const iconManifest = require("../manifest.json");

const { normalizeIcon, normalizeTbIcon } = require("./normalize");
const { moveLibraryArtifacts } = require("./lib");
const manifestInfo = {};
const log = console.log;

function capitalizeFirstLetter(_string) {
  const fixName = {
    filled: "fill",
    outlined: "outline",
    regular: "",
    logos: "logo",
  };
  const string = fixName[_string] !== undefined ? fixName[_string] : _string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadSvgFilesList({ svgPath, prefix }, iconPack) {
  const list = await readdir(svgPath);
  const outList = [];

  for (const f of list) {
    const [_fileName, fileExt] = f.split(".");
    if (fileExt && fileExt.toLowerCase() === "svg") {
      let fileName = _fileName;
      if (
        Array.isArray(iconPack.removeFilePrefixes) &&
        iconPack.removeFilePrefixes.length > 0
      ) {
        for (const pfix of iconPack.removeFilePrefixes) {
          if (pfix && fileName.indexOf(pfix) === 0) {
            fileName = fileName.substring(pfix.length);
          }
        }
      }

      if (iconPack.removeFirtsCharsFromFile > 0) {
        fileName = fileName.substring(iconPack.removeFirtsCharsFromFile);
      }

      outList.push({
        filePath: path.resolve(svgPath, f),
        svgName:
          prefix +
          fileName
            .split("-")
            .map((x) => capitalizeFirstLetter(x))
            .join(""),
      });
    }
  }

  return outList;
}

function filterFolders(dir) {
  if ([".DS_Store"].includes(dir)) return false;
  return true;
}

function filterAttr(attr) {
  if (["p-id", "t", "style", "id"].includes(attr)) return false;
  return true;
}

function replaceColor(attr, sn) {
  const BLACK_COLOR = "#000";
  if (attr.includes(BLACK_COLOR) && sn === "io") {
    return attr.replace(BLACK_COLOR, "currentColor");
  }

  if (attr.includes(`fill="#`)) {
    if (sn === "io") console.log(attr);
    return ` fill="currentColor"`;
  }
  return attr;
}

function tagTreeToString(tagData, sn) {
  if (["defs"].includes(tagData.tag)) return "";

  return `<${tagData.tag}${Object.keys(tagData.attr)
    .filter(filterAttr)
    .map((k) => ` ${k}="${tagData.attr[k]}"`)
    .map((r) => replaceColor(r, sn))
    .join("")}>${(tagData.child || [])
    .map((t) => tagTreeToString(t))
    .filter((x) => !!x)
    .join("\n")}</${tagData.tag}>`;
}

async function generateSvgIconInfo(
  fileName,
  iconData,
  shortName,
  exportType = "lib"
) {
  if (!iconData.attr.viewBox) {
    iconData.attr.viewBox = viewBoxes[shortName];
  }

  const comressed = {
    a: {
      stroke: "none",
      ...iconData.attr,
    },
    c: (iconData.child || [])
      .map((t) => tagTreeToString(t, shortName))
      .map((x) => {
        if (shortName === "io" && x.includes("<line")) {
          const lineFixed = x.replace("<line", '<line stroke="currentColor"');

          return lineFixed;
        }

        return x;
      })
      .filter((x) => !!x)
      .join(""),
  };

  const templateExport = templateType[exportType];

  switch (shortName) {
    case "io": {
      const normalizedIo = await normalizeIcon(comressed, fileName);

      return templateExport(fileName, normalizedIo);
    }
    case "tb": {
      const normalizedTb = normalizeTbIcon(comressed);

      return templateExport(fileName, normalizedTb);
    }

    default:
      return templateExport(fileName, comressed);
  }
}

async function convertIconData(svg, multiColor) {
  const $svg = cheerio.load(svg, { xmlMode: true })("svg");

  // filter/convert attributes
  // 1. remove class attr
  const attrConverter = (
    /** @type {{[key: string]: string}} */ attribs,
    /** @type string */ tagName
  ) =>
    attribs &&
    Object.keys(attribs)
      .filter(
        (name) =>
          ![
            "class",
            ...(tagName === "svg"
              ? ["xmlns", "xmlns:xlink", "xml:space", "width", "height"]
              : []), // if tagName is svg remove size attributes
          ].includes(name)
      )
      .reduce((obj, name) => {
        const newName = name;
        switch (newName) {
          case "fill":
            if (
              attribs[name] === "none" ||
              attribs[name] === "currentColor" ||
              multiColor
            ) {
              obj[newName] = attribs[name];
            }
            break;
          default:
            obj[newName] = attribs[name];
            break;
        }
        return obj;
      }, {});

  // convert to [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
  const elementToTree = (/** @type {Cheerio} */ element) =>
    element
      .filter((_, e) => e.tagName && !["style"].includes(e.tagName))
      .map((_, e) => {
        if (e.tagName === "path") {
          if (e.attribs.stroke) {
            e.attribs.stroke = "currentColor";
          }
        }
        return {
          tag: e.tagName,
          attr: attrConverter(e.attribs, e.tagName),
          child:
            e.children && e.children.length
              ? elementToTree(cheerio(e.children))
              : undefined,
        };
      })
      .get();

  const tree = elementToTree($svg);
  return tree[0];
}

async function generateSvg(iconPack, svgItem) {
  const svgStr = await promisify(fs.readFile)(svgItem.filePath, "utf8");
  const iconData = await convertIconData(svgStr, true);
  return iconData;
}

async function loadPack(iconPack) {
  manifestInfo[iconPack.shortName] = {
    iconsList: [],
    name: iconPack.packName,
    path: iconPack.shortName,
    license: iconPack.license,
    sourceUrl: iconPack.url,
  };

  const packFolder = path.resolve(`${OUT_DIR}/${iconPack.shortName}`);
  await mkdir(packFolder);

  const packPath = path.resolve(`${OUT_DIR}/${iconPack.shortName}`);

  // Write webside artifacts
  const webPackFolder = path.resolve(`${WEB_DIR}/icons`, iconPack.shortName);
  await mkdir(webPackFolder);

  // package.json pack

  appendFile(path.resolve(packPath, "package.json"), PACKAGE_JSON_PACK);

  // Icon File
  const headerFile = `import { IconTemplate } from "../lib";`;
  appendFile(path.resolve(packPath, `index.module.js`), headerFile);

  // Icon CJS file
  const headerCjsFile = `var IconTemplate = require('../lib').IconTemplate;`;
  appendFile(path.resolve(packPath, `index.js`), headerCjsFile);

  // TS File
  const headerTsFile = `import type { IconTypes } from '../lib/browser/IconWrapper'`;
  appendFile(path.resolve(packPath, `index.d.ts`), headerTsFile);

  const baseFolder = path.resolve(__dirname, "../", iconPack.iconsPath);

  const folders = [];
  if (iconPack.subFolders) {
    // load subfolders
    const list = await readdir(baseFolder);
    for (const li of list.filter(filterFolders)) {
      folders.push({
        prefix:
          capitalizeFirstLetter(
            iconPack.removeMainPrefix ? "" : iconPack.shortName
          ) + capitalizeFirstLetter(li.toLowerCase()),
        svgPath: path.resolve(baseFolder, li),
      });
    }
  } else {
    folders.push({
      prefix: capitalizeFirstLetter(
        iconPack.removeMainPrefix ? "" : iconPack.shortName
      ),
      svgPath: baseFolder,
    });
  }

  log(
    chalk.dim(`${iconPack.packName} package has been generated`) +
      chalk.green(" ✓")
  );

  for (const item of folders) {
    const svgList = await loadSvgFilesList(item, iconPack);

    for (const svgFile of svgList) {
      manifestInfo[iconPack.shortName].iconsList.push(svgFile.svgName);

      const iconData = await generateSvg(iconPack, svgFile);

      const svgAsJs = await generateSvgIconInfo(
        svgFile.svgName,
        iconData,
        iconPack.shortName
      );

      const svgAsCjs = await generateSvgIconInfo(
        svgFile.svgName,
        iconData,
        iconPack.shortName,
        "cjs"
      );

      const defaultSvg = await generateSvgIconInfo(
        svgFile.svgName,
        iconData,
        iconPack.shortName,
        "isolate"
      );

      await makeIconFile(defaultSvg, iconPack.shortName, svgFile.svgName);

      // Icon File ESM
      appendFile(path.resolve(packPath, `index.module.js`), svgAsJs);

      // Icon File Server side
      appendFile(path.resolve(packPath, `index.js`), svgAsCjs);

      // TS File
      const contentTsFile = `\nexport declare const ${svgFile.svgName}: IconTypes;`;
      appendFile(path.resolve(packPath, `index.d.ts`), contentTsFile);

      totalCount++;
    }
  }
}

async function buildLib() {
  const execOpt = {
    cwd: _rootDir,
  };

  await Promise.all([
    exec("rollup -c", execOpt),
    exec(`rm -rf ${WEB_DIR}/icons && mkdir ${WEB_DIR}/icons`),
    exec(`rm -rf ${WEB_DIR}/search.js && touch ${WEB_DIR}/search.js`),
    exec(`rm -rf ${WEB_DIR}/meta.js && touch ${WEB_DIR}/meta.js`),
  ]);

  await moveLibraryArtifacts();
}

async function writePackageJson() {
  const DIST = path.resolve(_rootDir, "dist");

  const packageJsonStr = await fsPromise.readFile(
    path.resolve(_rootDir, "package.json"),
    "utf-8"
  );
  let packageJson = JSON.parse(packageJsonStr);

  delete packageJson.private;
  delete packageJson.devDependencies;
  delete packageJson.scripts;

  packageJson = {
    ...packageJson,
  };

  const editedPackageJsonStr = JSON.stringify(packageJson, null, 2);
  await fsPromise.writeFile(
    path.resolve(DIST, "package.json"),
    editedPackageJsonStr
  );
}

async function generateIconsManifest() {
  await appendFile(
    path.resolve(WEB_DIR, `meta.js`),
    `export default [\n`,
    "utf-8"
  );
  for (const pk of Object.keys(manifestInfo)) {
    const pack = manifestInfo[pk];

    for (const prop of Object.keys(pack)) {
      if (prop === "iconsList") {
        await generateSearchFile(pack);

        await generateMetaPackFile(pack);
      }
    }
  }
  await fsPromise
    .readFile(path.resolve(WEB_DIR, `search.js`), "utf-8")
    .then(async (file) => {
      await fsPromise.writeFile(
        path.resolve(WEB_DIR, `search.js`),
        `export default ${file}`,
        "utf-8"
      );
    });
  await appendFile(path.resolve(WEB_DIR, `meta.js`), `]`, "utf-8");
}

async function init() {
  await buildLib();

  await writePackageJson();

  await copyFile(licenseFrom, licenseTo);

  await copyFile(readmeFrom, readmeTo);

  console.log("Artifacts files has been copied");
}

async function main() {
  console.log("Initializing");
  await init();

  for (const iconPack of iconManifest.sort((x1, x2) => {
    if (x1.packName > x2.packName) return 1;
    if (x1.packName < x2.packName) return -1;
    return 0;
  })) {
    await loadPack(iconPack);
  }

  await generateIconsManifest();

  log(" ");

  log(chalk.green(`${totalCount}`) + chalk.dim(" icons has been generated"));

  console.log(`  `);
}
main();
