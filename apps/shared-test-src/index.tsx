/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import { FaSolidAnchorCircleCheck } from "solid-icons/fa";

function App() {
  const [color, setColor] = createSignal("#2c4f7c");

  return (
    <div class="container">
      <h1>Version Test</h1>

      <FaSolidAnchorCircleCheck
        size={"5em"}
        color={color()}
        style={{
          transition: "color 0.5s ease",
        }}
      />

      <button
        class="toggle-btn"
        onClick={() => setColor(color() === "#2c4f7c" ? "#e63946" : "#2c4f7c")}
      >
        Toggle Color
      </button>
    </div>
  );
}

const root = document.getElementById("root");

if (root instanceof HTMLElement) {
  render(() => <App />, root);
}
