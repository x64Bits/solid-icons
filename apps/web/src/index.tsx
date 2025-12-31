/* @refresh reload */
import { render } from "solid-js/web";

import "./styles/base.css";
import "./styles/syntax.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
