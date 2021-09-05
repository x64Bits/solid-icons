var cheerio = require("cheerio");
if (typeof cheerio != "function") cheerio = require("cheerio").default;
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;
const rimraf = require("rimraf");
const { stringify } = require("javascript-stringify");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);
const rimrafFolder = promisify(rimraf);

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
const outDir = path.resolve(__dirname, "../dist");

// LICENSE
const licenseFrom = path.resolve(projectPath, "LICENSE");
const licenseTo = path.resolve(outDir, "LICENSE");

// README.md
const readmeFrom = path.resolve(projectPath, "README.md");
const readmeTo = path.resolve(outDir, "README.md");

// Manifest
const iconManifest = require("../manifest.json");
const { MANIFEST_DIR, templateType } = require("./constants");
const { NONAME } = require("dns");
const manifestFile = path.resolve(projectPath, "manifest.js");
const manifestInfo = {};

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

function generateSvgIconInfo(
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
      .filter((x) => !!x)
      .join(""),
  };

  const templateExport = templateType[exportType];

  return templateExport(fileName, comressed);
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

  const manifestPackFolder = path.resolve(MANIFEST_DIR, iconPack.shortName);
  await mkdir(manifestPackFolder);

  // Icon File
  const headerFile = `import IconWrapper from "../esm/IconWrapper";`;
  appendFile(path.resolve(packFolder, `index.js`), headerFile);

  // TS File
  const headerTsFile = `import { IconTypes } from '../types/IconWrapper'`;
  appendFile(path.resolve(packFolder, `index.d.ts`), headerTsFile);

  const packExport = `export * from './${iconPack.shortName}';\n`;
  appendFile(path.resolve(outDir, `all.d.ts`), packExport);

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

      const svgAsJs = generateSvgIconInfo(
        svgFile.svgName,
        iconData,
        iconPack.shortName
      );

      const defaultSvg = generateSvgIconInfo(
        svgFile.svgName,
        iconData,
        iconPack.shortName,
        "isolate"
      );

      await makeIconFile(defaultSvg, iconPack.shortName, svgFile.svgName);

      // Icon File
      appendFile(path.resolve(packFolder, `index.js`), svgAsJs);

      // TS File
      const contentTsFile = `\nexport declare const ${svgFile.svgName}: IconTypes;`;
      appendFile(path.resolve(packFolder, `index.d.ts`), contentTsFile);
    }
  }
}

async function buildLib() {
  const execOpt = {
    cwd: _rootDir,
  };

  await Promise.all([
    exec("rollup -c", execOpt),
    exec("rm -rf ./manifest.js", execOpt),
    exec("rm -rf ./manifest && mkdir ./manifest"),
  ]);
}

async function writePackageJson() {
  const DIST = path.resolve(_rootDir, "dist");

  const packageJsonStr = await fsPromise.readFile(
    path.resolve(_rootDir, "package.json"),
    "utf-8"
  );
  let packageJson = JSON.parse(packageJsonStr);

  delete packageJson.private;
  delete packageJson.dependencies;
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
    path.resolve(_rootDir, `manifest/meta.js`),
    `export default [\n`,
    "utf-8"
  );
  for (const pk of Object.keys(manifestInfo)) {
    const pack = manifestInfo[pk];

    for (const prop of Object.keys(pack)) {
      if (prop === "iconsList") {
        await generateSearchFile(pack);

        // await generatePackFile(pack);

        await generateMetaPackFile(pack);
      }
    }
  }
  await appendFile(path.resolve(_rootDir, `manifest/meta.js`), "]", "utf-8");
}

async function init() {
  await buildLib();

  await writePackageJson();

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

  await generateIconsManifest();

  console.log("Done!");
}
main();
