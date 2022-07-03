var cheerio = require("cheerio");
const { fileNames } = require("./constants/io-fix-icons");
const { svgo } = require("./svgo");

function replaceTags(contentString) {
  return contentString
    .replaceAll(
      "<path",
      '<path fill="none" stroke="currentColor" stroke-width="32" '
    )
    .replaceAll(
      '<line stroke="currentColor"',
      '<line stroke="currentColor" stroke-width="32" '
    )
    .replaceAll(
      "<ellipse",
      '<ellipse fill="none" stroke="currentColor" stroke-width="32" '
    )
    .replaceAll(
      "<rect",
      '<rect fill="none" stroke="currentColor" stroke-width="32" '
    )
    .replaceAll(
      "<circle",
      '<circle fill="none" stroke="currentColor" stroke-width="32" '
    );
}

async function normalizeIcon(iconData, iconName) {
  const rawContent = iconData.c;
  if (iconName.includes("Outline")) {
    return {
      ...iconData,
      c: replaceTags(rawContent),
    };
  }

  if (fileNames.includes(iconName)) {
    return {
      ...iconData,
      c: replaceTags(rawContent),
    };
  }

  const svgString = concatSvgContent(iconData);
  const result = await svgo.optimize(svgString);
  const optimizedSvgString = result.data;
  const svg = cheerio.load(optimizedSvgString, { xmlMode: true })("svg");

  let stringContent = svg.html();

  if (iconName.includes("Outline")) {
    stringContent = stringContent.replaceAll(
      "<path",
      `<path fill="none" stroke-width="32" stroke="currentColor"`
    );
  }

  return { ...iconData, c: stringContent };
}

function concatSvgContent(contentData) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${contentData.a.viewBox}">${contentData.c}</svg>`;
}

function normalizeTbIcon(iconData) {
  let stringContent = iconData.c;
  stringContent = stringContent.replaceAll(
    '<path stroke="currentColor"',
    '<path stroke="none"'
  );

  return { ...iconData, c: stringContent };
}

module.exports = {
  normalizeIcon,
  normalizeTbIcon,
};
