const path = require("path");
const fsPromise = require("fs").promises;

const { SEARCH_FILE_PATH, defaultSearchFile, WEB_DIR } = require("./constants");

async function generateSearchFile(pack) {
  const searchFile = await fsPromise
    .readFile(SEARCH_FILE_PATH, "utf-8")
    .then((file) => {
      return JSON.parse(file);
    })
    .catch(async () => {
      await fsPromise.writeFile(
        SEARCH_FILE_PATH,
        JSON.stringify(defaultSearchFile),
        "utf-8"
      );

      const parsedFile = await fsPromise.readFile(SEARCH_FILE_PATH, "utf-8");
      return JSON.parse(parsedFile);
    });

  searchFile.icons = searchFile.icons.concat(pack.iconsList);

  await fsPromise.writeFile(
    path.resolve(WEB_DIR, `search.js`),
    `${JSON.stringify(searchFile)}`,
    "utf-8"
  );
}

async function generateMetaPackFile(pack) {
  const dropIcons = {
    name: pack.name,
    path: pack.path,
    license: pack.license,
    sourceUrl: pack.sourceUrl,
  };

  await fsPromise.appendFile(
    path.resolve(WEB_DIR, `meta.js`),
    `${JSON.stringify(dropIcons)},`,
    "utf-8"
  );
}

// populate website icons folder
async function makeIconFile(content, packId, iconName) {
  await fsPromise.appendFile(
    path.resolve(WEB_DIR, `icons/${packId}/${iconName}.js`),
    content,
    "utf-8"
  );
}

module.exports = {
  generateSearchFile,
  generateMetaPackFile,
  makeIconFile,
};
