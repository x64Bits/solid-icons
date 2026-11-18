import { render } from "@solidjs/web";
import { createMemo, createSignal, For, Show } from "solid-js";
import { CustomIcon, type IconTypes } from "solid-icons";
import {
  TbOutlineBrandSolidjs,
  TbOutlineBolt,
  TbOutlineCodeCircle,
  TbFillFlame,
  TbOutlineSparkles,
} from "solid-icons/tb";
import {
  FaSolidAnchorCircleCheck,
  FaSolidBolt,
  FaSolidCompass,
  FaSolidCube,
} from "solid-icons/fa";
import {
  IoAccessibilityOutline,
  IoAddOutline,
  IoAirplaneOutline,
  IoSparklesOutline,
} from "solid-icons/io";
import { FiFeather, FiMoon, FiSearch, FiSun } from "solid-icons/fi";
import { AiOutlineAntDesign, AiOutlineThunderbolt } from "solid-icons/ai";
import { HiOutlineCubeTransparent, HiOutlineSparkles } from "solid-icons/hi";
import { BsBoxes, BsGrid } from "solid-icons/bs";
import { RiLogosRemixRunLine, RiWeatherFlashlightLine } from "solid-icons/ri";
import { MdFillFavorite } from "solid-icons/md";
import "./styles.css";

interface IconEntry {
  name: string;
  pack: string;
  component: IconTypes;
}

const CUSTOM_ICON_SRC = {
  a: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" },
  c: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />',
};

const ICONS: IconEntry[] = [
  { name: "TbOutlineBrandSolidjs", pack: "tb", component: TbOutlineBrandSolidjs },
  { name: "TbOutlineBolt", pack: "tb", component: TbOutlineBolt },
  { name: "TbOutlineCodeCircle", pack: "tb", component: TbOutlineCodeCircle },
  { name: "TbFillFlame", pack: "tb", component: TbFillFlame },
  { name: "TbOutlineSparkles", pack: "tb", component: TbOutlineSparkles },
  { name: "FaSolidAnchorCircleCheck", pack: "fa", component: FaSolidAnchorCircleCheck },
  { name: "FaSolidBolt", pack: "fa", component: FaSolidBolt },
  { name: "FaSolidCompass", pack: "fa", component: FaSolidCompass },
  { name: "FaSolidCube", pack: "fa", component: FaSolidCube },
  { name: "IoAccessibilityOutline", pack: "io", component: IoAccessibilityOutline },
  { name: "IoAddOutline", pack: "io", component: IoAddOutline },
  { name: "IoAirplaneOutline", pack: "io", component: IoAirplaneOutline },
  { name: "IoSparklesOutline", pack: "io", component: IoSparklesOutline },
  { name: "FiFeather", pack: "fi", component: FiFeather },
  { name: "FiSearch", pack: "fi", component: FiSearch },
  { name: "AiOutlineAntDesign", pack: "ai", component: AiOutlineAntDesign },
  { name: "AiOutlineThunderbolt", pack: "ai", component: AiOutlineThunderbolt },
  { name: "HiOutlineCubeTransparent", pack: "hi", component: HiOutlineCubeTransparent },
  { name: "HiOutlineSparkles", pack: "hi", component: HiOutlineSparkles },
  { name: "BsBoxes", pack: "bs", component: BsBoxes },
  { name: "BsGrid", pack: "bs", component: BsGrid },
  { name: "RiLogosRemixRunLine", pack: "ri", component: RiLogosRemixRunLine },
  { name: "RiWeatherFlashlightLine", pack: "ri", component: RiWeatherFlashlightLine },
  { name: "MdFillFavorite", pack: "md", component: MdFillFavorite },
];

const PACKS = ["all", "tb", "fa", "io", "fi", "ai", "hi", "bs", "ri", "md"];

function App() {
  const [dark, setDark] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [pack, setPack] = createSignal("all");
  const [size, setSize] = createSignal(28);
  const [copied, setCopied] = createSignal<string | null>(null);

  const filtered = createMemo(() => {
    const q = query().trim().toLowerCase();
    const p = pack();
    return ICONS.filter((item) => {
      const matchPack = p === "all" || item.pack === p;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.pack.toLowerCase().includes(q);
      return matchPack && matchQuery;
    });
  });

  const toggleTheme = () => {
    const next = !dark();
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  };

  let timer: number | undefined;
  const copyImport = (item: IconEntry) => {
    const snippet = `import { ${item.name} } from "solid-icons/${item.pack}";`;
    navigator.clipboard?.writeText(snippet).catch(() => {});
    setCopied(snippet);
    window.clearTimeout(timer);
    timer = window.setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main class="page">
      <header class="header">
        <div class="brand">
          <div class="brand-mark">
            <CustomIcon src={CUSTOM_ICON_SRC} size={20} />
          </div>
          <div>
            <h1 class="brand-title">solid-icons</h1>
            <p class="brand-sub">live npm verification · monochrome showcase</p>
          </div>
        </div>

        <div class="header-actions">
          <span class="badge">solid-js@2.0.0</span>
          <span class="badge">solid-icons@2.0.0-rc.1</span>
          <button type="button" class="theme-btn" onClick={toggleTheme}>
            <Show when={dark()} fallback={<FiMoon size={14} />}>
              <FiSun size={14} />
            </Show>
            <span>{dark() ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>

      <section class="controls">
        <div class="search-wrap">
          <span class="search-icon">
            <FiSearch size={15} />
          </span>
          <input
            type="text"
            class="search-input"
            placeholder="Filter icons by name or pack..."
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </div>

        <label class="size-control">
          <span>size</span>
          <input
            type="range"
            min="16"
            max="48"
            value={size()}
            onInput={(e) => setSize(Number(e.currentTarget.value))}
          />
          <span>{size()}px</span>
        </label>
      </section>

      <nav class="packs" aria-label="Icon packs">
        <For each={PACKS}>
          {(p) => (
            <button
              type="button"
              class={`pack-pill ${pack() === p ? "active" : ""}`}
              onClick={() => setPack(p)}
            >
              {p}
            </button>
          )}
        </For>
      </nav>

      <section class="grid" aria-label="Icons">
        <Show
          when={filtered().length > 0}
          fallback={<div class="empty">No icons match "{query()}".</div>}
        >
          <For each={filtered()}>
            {(item) => {
              const Icon = item.component;
              return (
                <button
                  type="button"
                  class="card"
                  onClick={() => copyImport(item)}
                  title={`Copy import for ${item.name}`}
                >
                  <div class="card-icon">
                    <Icon size={`${size()}px`} />
                  </div>
                  <div class="card-meta">
                    <span class="card-name">{item.name}</span>
                    <span class="card-pack">solid-icons/{item.pack}</span>
                  </div>
                </button>
              );
            }}
          </For>
        </Show>
      </section>

      <Show when={copied()}>
        {(msg) => <div class="toast">Copied: {msg()}</div>}
      </Show>
    </main>
  );
}

const root = document.getElementById("root");
if (root instanceof HTMLElement) {
  render(() => <App />, root);
}
