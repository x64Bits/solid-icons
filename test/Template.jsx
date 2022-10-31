import { createSignal } from "solid-js";
import rgbHex from "rgb-hex";
import { afterEach, describe, expect, test } from "vitest";
import { render, fireEvent, screen, cleanup } from "solid-testing-library";

import { IconTemplate } from "../src/lib/index";

const exampleIcon = {
  a: { fill: "currentColor", viewBox: "0 0 16 16" },
  c: '<path d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312z"/>',
};

const Icon = (props) => IconTemplate(exampleIcon, props);
const initialColor = "#2c4f7c";

describe("<IconTemplate />", () => {
  afterEach(cleanup);

  test("render child", () => {
    const { container, unmount } = render(() => <Icon />);
    const children = container.getElementsByTagName("path");

    expect(children).toHaveLength(1);
    unmount();
  });

  test("reactive props", async () => {
    const expectedColor = "#0CDC73";

    const [color, setColor] = createSignal(initialColor);

    render(() => (
      <Icon
        color={color()}
        onClick={() => setColor(expectedColor)}
        role="svg"
      />
    ));

    const svg = await screen.findByRole("svg");

    fireEvent.click(svg);
    await Promise.resolve();

    const elementColor = rgbHex(getComputedStyle(svg).color);
    expect(elementColor).toMatchSnapshot(expectedColor);
  });

  test("viewBox defined", async () => {
    render(() => <Icon role="svg" />);
    const svg = await screen.findByRole("svg");

    const viewBox = svg.getAttribute("viewBox");
    expect(viewBox).toBe(exampleIcon.a.viewBox);
  });

  test("default values", async () => {
    render(() => <Icon role="svg" />);
    const svg = await screen.findByRole("svg");

    const defaultHeight = svg.getAttribute("height");
    const defaultColor = getComputedStyle(svg).color;

    expect(defaultHeight).toBe("1em");
    expect(defaultColor).toBe("currentColor");
  });

  test("custom values", async () => {
    const customSize = "3em";

    render(() => <Icon role="svg" size={customSize} color={initialColor} />);
    const svg = await screen.findByRole("svg");

    const customHeight = svg.getAttribute("height");
    const customWidth = svg.getAttribute("width");
    const customColor = `#${rgbHex(getComputedStyle(svg).color)}`;

    expect(customHeight).toBe(customSize);
    expect(customWidth).toBe(customSize);
    expect(customColor).toBe(initialColor);
  });
});
