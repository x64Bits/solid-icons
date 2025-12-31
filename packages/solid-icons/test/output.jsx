import { afterEach, describe, expect, test } from "vitest";
import { render, cleanup } from "solid-testing-library";

import * as tbIcons from "../dist/tb/index.js";
import * as riIcons from "../dist/ri/index.js";
import * as aiIcons from "../dist/ai/index.js";
import packages from "../src/build/packages.json";

function countPaths(container) {
  return container.querySelectorAll("path, rect").length;
}

describe("Icons in dist folder should be rendered correctly", () => {
  afterEach(cleanup);

  for (const packageInfo of packages) {
    const { shortName, packName } = packageInfo;

    describe(`Icons from ${packName} Icon Pack`, () => {
      test(`Render icons from ${packName} icon pack`, async () => {
        const iconPack = await import(`../dist/${shortName}/index.js`);

        for (const iconKey in iconPack) {
          const Icon = iconPack[iconKey];

          const { container, unmount } = render(() => <Icon />);
          const numPaths = countPaths(container);

          if (numPaths === 0) {
            throw new Error(`Failed icon: ${shortName}:${iconKey}`);
          }

          expect(numPaths).toBeGreaterThan(0);
          unmount();
        }
      });
    });
  }
});

describe("Tabler output SVG", () => {
  /**
   * For generate Tabler icons, a different SVGO configuration is
   * used to avoid problems with stroke, here
   * is a PR that address this issue: https://github.com/x64Bits/solid-icons/pull/42
   */
  afterEach(cleanup);

  for (const iconName in tbIcons) {
    const Icon = tbIcons[iconName];

    test(`Test normalization on Tabler Icon: ${iconName}`, () => {
      const { container, unmount } = render(() => <Icon />);
      const renderedSvg = container.querySelector("svg");

      const pathElements = renderedSvg.querySelectorAll("path");
      pathElements.forEach((pathElement) => {
        // Assert that each <path> element has a "stroke" attribute with the value "none" or null
        const strokeValue = pathElement.getAttribute("stroke");
        expect(strokeValue === "none" || strokeValue === null).toBe(true);
      });

      unmount();
    });
  }
});

describe("Remix Icons output SVG", () => {
  afterEach(cleanup);

  for (const iconName in riIcons) {
    const Icon = riIcons[iconName];

    test(`Test normalization on Remix icons Icon: ${iconName}`, () => {
      const { container, unmount } = render(() => <Icon />);
      const renderedSvg = container.querySelector("svg");

      const pathElements = renderedSvg.querySelectorAll("path");

      // Iterate through each <path> element
      pathElements.forEach((pathElement) => {
        // Assert that the "fill" attribute is set to "currentColor"
        expect(pathElement.getAttribute("fill")).toBe("currentColor");
      });

      unmount();
    });
  }
});

describe("Ant Design icons SVG", () => {
  afterEach(cleanup);

  for (const iconName in aiIcons) {
    const Icon = aiIcons[iconName];

    test(`Should display correct opacity on two tone icon: ${iconName}`, () => {
      const { container, unmount } = render(() => <Icon />);
      const renderedSvg = container.querySelector("svg");

      // Get the <path> elements within the SVG
      const pathElements = renderedSvg.querySelectorAll("path");

      // Check if the icon name includes "twotone"
      const isTwotone = iconName.toLocaleLowerCase().includes("twotone");

      // Iterate through each <path> element
      const fillOpacityCount = Array.from(pathElements).filter(
        (pathElement) => pathElement.getAttribute("fill-opacity") === "0.09"
      ).length;

      if (isTwotone) {
        expect(fillOpacityCount).toBeGreaterThan(0);
      } else {
        expect(fillOpacityCount).toBe(0);
      }

      unmount();
    });
  }
});
