import { JSX } from "react";

export interface navLinkProps {
  id: number;
  label: string;
  href: string;
}

export interface socialLinkProps {
  id: number;
  label: string;
  icon: JSX.Element;
  href: string;
}

export interface footerLinkProps {
  id: number;
  title: string;

  links: {
    id: number;
    icon?: JSX.Element;
    title?: string;
    label: string;
    href: string;
    label2?: string;
    href2?: string;
  }[];
}

export interface AboutUsDataProps {
  title: string;
  subtitle: string;
  desc: string;
  boldDesc: string;
  image: string;
  buttons: {
    label: string;
    href: string;
  }[];
}

export interface upcomingEventsProps {
  title: string;
  subTitle: string;
  label: string;
  href: string;
}

export interface GalleryDataProps {
  title: string;
  subTitle: string;
  images: string[];
  label: string;
  href: string;
}

export interface testimonialProps {
  title: string;
  subTitle: string;
  cards: {
    id: number;
    src: string;
    user: string;
    desc: string;
  }[];
}
