import { onMount, onCleanup } from "solid-js";

/**
 * Creates a very basic Intersection Observer.
 *
 * @param elements - A list of elements to watch
 * @param onChange - An event handler that returns an array of observer entires
 * @param threshold - Threshold of when to detect above a particular point
 * @param root - Root element used as viewport for checking visibility
 * @param rootMarigin - Root margin around theoot
 *
 * @example
 * ```ts
 * const [ add, remove, start, stop ] = createIntersectionObserver(els);
 * ```
 */
export const createIntersectionObserver = (
  elements?,
  onChange?,
  threshold?,
  root?,
  rootMargin?
) => {
  // If not supported, skip
  const observer = new IntersectionObserver(onChange, {
    threshold,
    root,
    rootMargin,
  });
  const add: any = (el) => observer.observe(el);
  const remove = (el) => observer.unobserve(el);
  const start = () => elements.forEach((el) => add(el));
  const stop = () =>
    observer.takeRecords().forEach((entry) => remove(entry.target));
  onMount(start);
  onCleanup(stop);
  return [add, remove, start, stop, observer];
};

/**
 * Creates a more advanced viewport observer for complex tracking.
 *
 * @param elements - A list of elements to watch
 * @param threshold - Threshold of when to detect above a particular point
 * @param root - Root element used as viewport for checking visibility
 * @param rootMarigin - Root margin around the root
 *
 * @example
 * ```ts
 * const [ add, remove, start, stop ] = createIntersectionObserver(els);
 * ```
 */
export const createViewportObserver = (
  elements = [],
  threshold = 0,
  root = null,
  rootMargin = "0%"
) => {
  const setters = new WeakMap();
  const onChange = (entries) =>
    entries.forEach((entry) => {
      setters.get(entry.target)(entry);
    });
  const [add, remove, start, stop] = createIntersectionObserver(
    elements,
    onChange,
    threshold,
    root,
    rootMargin
  );
  const addEntry = (el, setter) => {
    add(el);
    setters.set(el, setter);
  };
  const removeEntry = (el) => {
    setters.delete(el);
    remove(el);
  };
  onMount(start);
  return [addEntry, removeEntry, start, stop];
};
