import { createSignal, onCleanup, onMount, Show } from "solid-js";
import {
  BannerContainer,
  BannerCanvas,
  LeftSection,
  LogoWrapper,
  LogoGlow,
  LogoImg,
  LogoText,
  BannerText,
  RightSection,
  NeonButton,
  CloseButton,
} from "./styles";

export default function ZynthBanner() {
  let bannerRef: HTMLDivElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  let btnRef: HTMLButtonElement | undefined;
  const [visible, setVisible] = createSignal(
    localStorage.getItem("zynth-banner-dismissed") !== "true"
  );
  const [imageLoaded, setImageLoaded] = createSignal(false);

  onMount(() => {
    if (!canvasRef || !bannerRef || !btnRef || !visible()) return;

    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!bannerRef || !canvasRef || !ctx) return;
      width = bannerRef.clientWidth;
      height = bannerRef.clientHeight;
      canvasRef.width = width * dpr;
      canvasRef.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    window.addEventListener("resize", resize);
    resize();

    let orbitAngle = 0;
    let animationId: number;

    function draw() {
      if (!ctx || !bannerRef || !btnRef) return;
      ctx.clearRect(0, 0, width, height);

      const bannerRect = bannerRef.getBoundingClientRect();
      const btnRect = btnRef.getBoundingClientRect();

      const targetX = btnRect.left - bannerRect.left + btnRect.width / 2;
      const targetY = btnRect.top - bannerRect.top + btnRect.height / 2;

      const radiusX = btnRect.width / 2 + 6;
      const radiusY = btnRect.height / 2 + 6;

      orbitAngle += 0.02;

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < 2; i++) {
        const angle = orbitAngle + i * Math.PI;
        const x = targetX + Math.cos(angle) * radiusX;
        const y = targetY + Math.sin(angle) * radiusY;

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 255, 255, 1)";

        const size = 6;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    onCleanup(() => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    });
  });

  const handleClose = () => {
    if (!bannerRef) return;
    bannerRef.style.opacity = "0";
    bannerRef.style.marginTop = `-${bannerRef.offsetHeight}px`;
    localStorage.setItem("zynth-banner-dismissed", "true");
    setTimeout(() => {
      setVisible(false);
    }, 400);
  };

  return (
    <Show when={visible()}>
      <BannerContainer ref={bannerRef}>
        <BannerCanvas ref={canvasRef} />

        <LeftSection>
          <LogoWrapper>
            <LogoGlow />
            <LogoImg
              src="https://www.zynthai.com/_image?href=%2F_astro%2Flogo-light-alpha.DomHA_h6.png&w=1024&h=1024&f=webp"
              alt="Zynth Framework Logo"
              onLoad={() => setImageLoaded(true)}
              style={{
                opacity: imageLoaded() ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
            <LogoText>Zynth</LogoText>
          </LogoWrapper>
          <BannerText>
            Build native iOS and Android apps with <strong>SolidJS</strong>.
          </BannerText>
        </LeftSection>

        <RightSection>
          <NeonButton
            ref={btnRef}
            onClick={() => window.open("https://zynthai.com/zynth", "_blank")}
          >
            Start Building
          </NeonButton>
          <CloseButton onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </RightSection>
      </BannerContainer>
    </Show>
  );
}
