/* @refresh reload */
import { render } from "@solidjs/web";
import { createSignal } from "solid-js";
import { FaSolidAnchorCircleCheck } from "solid-icons/fa";
import { TbFillFlame } from "solid-icons/tb";
import { MdFillFavorite } from "solid-icons/md";

function App() {
  const [color, setColor] = createSignal("#2c4f7c");

  return (
    <div class="container" style={{ padding: "2rem", "font-family": "system-ui" }}>
      <h1>Solid 2.0 Test</h1>

      <div style={{ display: "flex", gap: "1rem", "align-items": "center" }}>
        <FaSolidAnchorCircleCheck
          size={"4em"}
          color={color()}
          style={{ transition: "color 0.5s ease" }}
        />
        <TbFillFlame size={"4em"} color="#e63946" />
        <MdFillFavorite size={"4em"} color="#d62828" />
      </div>

      <div style={{ "margin-top": "1.5rem" }}>
        <button
          class="toggle-btn"
          onClick={() => setColor(color() === "#2c4f7c" ? "#e63946" : "#2c4f7c")}
        >
          Toggle Color
        </button>
      </div>
    </div>
  );
}

const root = document.getElementById("root");

if (root instanceof HTMLElement) {
  render(() => <App />, root);
}


