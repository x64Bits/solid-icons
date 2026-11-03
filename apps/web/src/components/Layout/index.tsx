import { JSX } from "solid-js";
import Header from "../Header";
import Navbar from "../Navbar";
import Title from "../Title";
import { LayoutContainer, HeaderLayout, NavbarLayout, BannerLayout } from "./styles";
import ZynthBanner from "../ZynthBanner";

interface ILayoutProps {
  children: JSX.Element;
  title?: string;
  activePackage?: string;
}

export default function Layout(props: ILayoutProps) {
  return (
    <LayoutContainer>
      <BannerLayout>
        <ZynthBanner />
      </BannerLayout>
      <Title>{`Solid Icons ${props.title ? "| " + props.title : ""}`}</Title>
      <HeaderLayout>
        <Header />
      </HeaderLayout>
      <NavbarLayout>
        <Navbar activePackage={props.activePackage} />
      </NavbarLayout>
      {props.children}
    </LayoutContainer>
  );
}
