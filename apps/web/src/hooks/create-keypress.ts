import { onCleanup, createEffect } from "solid-js";
import invariant from "tiny-invariant";

const aliases = new Map([
  ["Win", "Meta"],
  ["Scroll", "ScrollLock"],
  ["Spacebar", " "],
  ["Down", "ArrowDown"],
  ["Left", "ArrowLeft"],
  ["Right", "ArrowRight"],
  ["Up", "ArrowUp"],
  ["Del", "Delete"],
  ["Crsel", "CrSel"],
  ["Exsel", "ExSel"],
  ["Apps", "ContextMenu"],
  ["Esc", "Escape"],
  ["Decimal", "."],
  ["Multiply", "*"],
  ["Add", "+"],
  ["Subtract", "-"],
  ["Divide", "/"],
]);

const shimKeyboardEvent = (event: KeyboardEvent) => {
  if (aliases.has(event.key)) {
    const key = aliases.get(event.key);

    Object.defineProperty(event, "key", {
      configurable: true,
      enumerable: true,
      get() {
        return key;
      },
    });
  }
};

type Key = string;

const createKeypress = (
  keys: Key | Key[],
  handler: ((event: KeyboardEvent) => void) | null
) => {
  invariant(
    Array.isArray(keys) || typeof keys === "string",
    "Expected `keys` to be an array or string"
  );
  if (Array.isArray(keys)) {
    keys.forEach((key, i) => {
      invariant(
        typeof key === "string",
        `Expected \`keys[${i}]\` to be a string`
      );
    });
  }
  invariant(
    typeof handler === "function" || handler == null,
    "Expected `handler` to be a function"
  );

  let eventListenerRef: ((event: KeyboardEvent) => void) | undefined;

  createEffect(() => {
    eventListenerRef = (event) => {
      shimKeyboardEvent(event);
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event);
      }
    };
  });

  createEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      eventListenerRef?.(event);
    };
    window.addEventListener("keydown", eventListener);
    onCleanup(() => {
      window.removeEventListener("keydown", eventListener);
    });
  });
};

export default createKeypress;
