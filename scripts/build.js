const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const { stringify } = require("javascript-stringify");
const { promisify } = require("util");

const iconManifest = require("../manifest.json");

const projectPath = path.resolve(__dirname, "../");
const outDir = path.resolve(__dirname, "../dist");

// ============== Files paths ==============
// package.json
const packageJsonPath = path.resolve(projectPath, "package.json.sample");
const packageJsonTo = path.resolve(outDir, "package.json");

// lib/package.json
const libPackageJsonFrom = path.resolve(
  `${projectPath}/src/templates`,
  "build.package.json"
);
const libPackageJsonTo = path.resolve(`${outDir}/lib`, "package.json");

const indexTypeFrom = path.resolve(`${projectPath}/src/templates`, "main.d.ts");

const indexTypeTo = path.resolve(`${outDir}/lib`, "main.d.ts");

const iconTypeFrom = path.resolve(
  `${projectPath}/src/templates`,
  "IconTemplate.d.ts"
);

const iconTypeTo = path.resolve(`${outDir}/lib`, "IconTemplate.d.ts");

const indexRootFrom = path.resolve(`${projectPath}/src/templates`, "index.js");

const indexRootTo = path.resolve(`${outDir}`, "index.js");

// LICENSE
const licenseFrom = path.resolve(projectPath, "LICENSE");
const licenseTo = path.resolve(outDir, "LICENSE");

// README.md
const readmeFrom = path.resolve(projectPath, "README.md");
const readmeTo = path.resolve(outDir, "README.md");

const manifestInfo = {};

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);
const rimrafFolder = promisify(rimraf);

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

function tagTreeToString(tagData) {
  if (["defs"].includes(tagData.tag)) return "";

  return `<${tagData.tag}${Object.keys(tagData.attr)
    .filter(filterAttr)
    .map((k) => ` ${k}="${tagData.attr[k]}"`)
    .join("")}>${(tagData.child || [])
    .map((t) => tagTreeToString(t))
    .filter((x) => !!x)
    .join("\n")}</${tagData.tag}>`;
}

function generateSvgIconInfo(fileName, iconData) {
  const comressed = {
    a: iconData.attr,
    c: (iconData.child || [])
      .map((t) => tagTreeToString(t))
      .filter((x) => !!x)
      .join(""),
  };
  return `\nexport function ${fileName}(props) {
  return IconTemplate({src: ${stringify(comressed, null, 2)}, ...props})
}`;
  //`// ${fileName}\nexport default ${stringify(comressed, null, 2)};`;
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
      .map((_, e) => ({
        tag: e.tagName,
        attr: attrConverter(e.attribs, e.tagName),
        child:
          e.children && e.children.length
            ? elementToTree(cheerio(e.children))
            : undefined,
      }))
      .get();

  const tree = elementToTree($svg);
  return tree[0]; // like: [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
}

async function generateSvg(iconPack, svgItem) {
  const svgStr = await promisify(fs.readFile)(svgItem.filePath, "utf8");
  const iconData = await convertIconData(svgStr, true);
  return iconData;
}

async function loadPack(iconPack) {
  console.log("current load:", iconPack.packName);
  console.log("created folder for:", iconPack.shortName);

  // appendFile(gitignoreFile, `${iconPack.shortName}\n`);

  manifestInfo[iconPack.shortName] = {
    iconsList: [],
    name: iconPack.packName,
    path: iconPack.shortName,
    license: iconPack.license,
    sourceUrl: iconPack.url,
  };

  const packFolder = path.resolve(outDir, iconPack.shortName);
  await mkdir(packFolder);

  // Icon File
  const headerFile = `import IconTemplate from "../lib/main.es";`;
  appendFile(path.resolve(packFolder, `index.js`), headerFile);

  // TS File
  const headerTsFile = `import { IconType } from '../lib/IconTemplate'`;
  appendFile(path.resolve(packFolder, `index.d.ts`), headerTsFile);

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

  console.log(`${iconPack.packName} package has been generated ✓`);

  for (const item of folders) {
    const svgList = await loadSvgFilesList(item, iconPack);

    for (const svgFile of svgList) {
      manifestInfo[iconPack.shortName].iconsList.push(svgFile.svgName);

      const iconData = await generateSvg(iconPack, svgFile);
      const svgAsJs = generateSvgIconInfo(svgFile.svgName, iconData);

      // Icon File
      appendFile(path.resolve(packFolder, `index.js`), svgAsJs);

      // TS File
      const contentTsFile = `\nexport declare const ${svgFile.svgName}: IconType;`;
      appendFile(path.resolve(packFolder, `index.d.ts`), contentTsFile);

      // await appendFile(
      //   manifestFile,
      //   `import ${svgFile.svgName} from './${iconPack.shortName}/${svgFile.svgName}';\n`
      // );
    }
  }
}

async function init() {
  await copyFile(indexTypeFrom, indexTypeTo);

  await copyFile(iconTypeFrom, iconTypeTo);

  await copyFile(indexRootFrom, indexRootTo);

  await copyFile(packageJsonPath, packageJsonTo);

  await copyFile(libPackageJsonFrom, libPackageJsonTo);

  await copyFile(licenseFrom, licenseTo);

  await copyFile(readmeFrom, readmeTo);

  console.log("Artifacts files has been copied");
}

async function main() {
  console.log("Init...");
  await init();

  console.log("Start loading SVG icons...");
  for (const iconPack of iconManifest.sort((x1, x2) => {
    if (x1.packName > x2.packName) return 1;
    if (x1.packName < x2.packName) return -1;
    return 0;
  })) {
    await loadPack(iconPack);
  }

  console.log("Done!");
}
main();
