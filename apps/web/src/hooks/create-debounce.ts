const createDebounce = (cb: (...ars: any) => void, wait: number) => {
  let timeoutId: any;
  const clear = () => clearTimeout(timeoutId);
  const trigger = (...args) => {
    if (timeoutId !== undefined) {
      clear();
    }
    timeoutId = setTimeout(() => cb(...args), wait);
  };
  return [trigger, clear];
};

export default createDebounce;
