export function darkModeScrollbars(active: boolean) {
  const html = document.documentElement;

  html.style.overflow = "hidden";
  document.body.clientWidth;
  html.setAttribute("data-color-scheme", active ? "dark" : "light");
  html.style.overflow = "";
}
