import type { Component } from "solid-js";
import { Router } from "@solidjs/router";

import GlobalStyles from "./components/Styles/GlobalStyles";
import Theme from "./components/Styles/Theme";
import AppContextProvider from "./store/AppContext";
import Routes from "./router";

const App: Component = () => {
  return (
    <AppContextProvider>
      <Theme>
        <GlobalStyles />
        <Router>
          <Routes />
        </Router>
      </Theme>
    </AppContextProvider>
  );
};

export default App;
