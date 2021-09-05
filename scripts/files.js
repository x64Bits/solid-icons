const path = require("path");
const fsPromise = require("fs").promises;

const {
  SEARCH_FILE_PATH,
  defaultSearchFile,
  MANIFEST_DIR,
} = require("./constants");

async function generateSearchFile(pack) {
  const searchFile = await fsPromise
    .readFile(SEARCH_FILE_PATH, "utf-8")
    .then((file) => JSON.parse(file))
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
    path.resolve(MANIFEST_DIR, `search.json`),
    `${JSON.stringify(searchFile)}`,
    "utf-8"
  );
}

async function generatePackFile(pack) {
  await fsPromise.appendFile(
    path.resolve(MANIFEST_DIR, `${pack.path}.json`),
    `${JSON.stringify(pack)}`,
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
    path.resolve(MANIFEST_DIR, `meta.js`),
    `${JSON.stringify(dropIcons)},`,
    "utf-8"
  );
}

// Manifest json svg
async function makeIconFile(content, packId, iconName) {
  await fsPromise.appendFile(
    path.resolve(MANIFEST_DIR, `${packId}/${iconName}.js`),
    content,
    "utf-8"
  );
}

module.exports = {
  generateSearchFile,
  generatePackFile,
  generateMetaPackFile,
  makeIconFile,
};
