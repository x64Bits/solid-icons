import { FaSolidAnchorCircleCheck } from "solid-icons/fa";
import { createSignal } from "solid-js";

export const IconTest = () => {
  const [color, setColor] = createSignal("#2c4f7c");

  return (
    <div
      style={{
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        width: "100vw",
        height: "100vh",
        "flex-direction": "column",
        gap: "2rem",
      }}
    >
      <FaSolidAnchorCircleCheck
        size={"5em"}
        color={color()}
        style={{
          transition: "color 350ms linear",
        }}
      />
      <button
        style={{ "margin-left": "20px", padding: "10px 20px" }}
        onClick={() => setColor(color() === "#2c4f7c" ? "#e63946" : "#2c4f7c")}
      >
        Toggle Color
      </button>
    </div>
  );
};
