import { styled } from "solid-styled-components";

export const BannerContainer = styled("div")`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 56px;
  background-color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  transition: opacity 0.4s ease, margin-top 0.4s ease;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

export const BannerCanvas = styled("canvas")`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
`;

export const LeftSection = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 20;
  min-width: 0;
  flex: 1;
`;

export const LogoWrapper = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoGlow = styled("div")`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(24px);
  border-radius: 9999px;
  transform: scale(1.25);
  z-index: 0;
`;

export const LogoImg = styled("img")`
  height: 2.5rem;
  width: 2.5rem;
  object-fit: contain;
  position: relative;
  z-index: 10;
`;

export const LogoText = styled("span")`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  letter-spacing: 0.025em;
  position: relative;
  z-index: 10;
`;

export const BannerText = styled("span")`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 500;
  display: none;

  @media (min-width: 768px) {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  strong {
    font-weight: bold;
    color: white;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
`;

export const RightSection = styled("div")`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 20;
  flex-shrink: 0;
  min-width: max-content;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }
`;

export const NeonButton = styled("button")`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.125rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

export const CloseButton = styled("button")`
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;
  padding: 0.5rem;
  border-radius: 9999px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  flex-shrink: 0;
  min-width: 36px;
  min-height: 36px;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
    display: block;
    color: inherit;
  }
`;
