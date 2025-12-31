import { createGlobalStyles } from "solid-styled-components";

const GlobalStyles = () => {
  const Styles = createGlobalStyles`    
    html, body {
      font-family: 'Inter', sans-serif;
      font-style: normal;
    }

    [data-color-scheme="dark"] {
      color-scheme: dark;
    }

    [data-color-scheme="light"] {
      color-scheme: light;
    }

    @keyframes onDarkMode {
      from {
        transform: translateX(-3px);
      }

      to {
        transform: translateX(25px);
      }
    }

    @keyframes offDarkMode {
      from {
        transform: translateX(25px);
      }

      to {
        transform: translateX(-3px);
      }
    }
  `;
  return <Styles />;
};

export default GlobalStyles;
