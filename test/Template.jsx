import { createSignal } from "solid-js";
import rgbHex from "rgb-hex";
import { afterEach, describe, expect, test } from "vitest";
import { render, fireEvent, screen, cleanup } from "solid-testing-library";
import { FiIconsCircle } from "../dist/fi/index.js";

describe("<FiIconsCircle />", () => {
  const initialColor = "#2c4f7c";
  const innerHTML = `<circle cx="12" cy="12" r="10"></circle>`;
  const viewBox = "0 0 24 24";
  const height = "1em";
  const width = "1em";
  const color = "currentColor";
  const strokeWidth = "2";
  const overflow = "visible";

  afterEach(cleanup);

  test("render child", () => {
    const { container, unmount } = render(() => <FiIconsCircle />);
    const children = container.getElementsByTagName("svg");

    expect(children.length).toBe(1);
    const svg = children[0];

    expect(svg.innerHTML).toBe(innerHTML);
    expect(svg.getAttribute("viewBox")).toBe(viewBox);
    expect(svg.getAttribute("height")).toBe(height);
    expect(svg.getAttribute("width")).toBe(width);
    expect(svg.getAttribute("stroke-width")).toBe(strokeWidth);
    const style = getComputedStyle(svg);
    expect(style.color).toBe(color);
    expect(style.overflow).toBe(overflow);

    unmount();
  });

  test("reactive props", async () => {
    const expectedColor = "#0CDC73";

    const [color, setColor] = createSignal(initialColor);

    render(() => (
      <FiIconsCircle
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
    render(() => <FiIconsCircle role="svg" />);
    const svg = await screen.findByRole("svg");

    const viewBox = svg.getAttribute("viewBox");
    expect(viewBox).toBe(viewBox);
  });

  test("default values", async () => {
    render(() => <FiIconsCircle role="svg" />);
    const svg = await screen.findByRole("svg");

    const defaultHeight = svg.getAttribute("height");
    const defaultColor = getComputedStyle(svg).color;

    expect(defaultHeight).toBe("1em");
    expect(defaultColor).toBe("currentColor");
  });

  test("custom values", async () => {
    const customSize = "3em";

    render(() => (
      <FiIconsCircle role="svg" size={customSize} color={initialColor} />
    ));
    const svg = await screen.findByRole("svg");

    const customHeight = svg.getAttribute("height");
    const customWidth = svg.getAttribute("width");
    const customColor = `#${rgbHex(getComputedStyle(svg).color)}`;

    expect(customHeight).toBe(customSize);
    expect(customWidth).toBe(customSize);
    expect(customColor).toBe(initialColor);
  });
});
