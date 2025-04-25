import { footerLinkProps, navLinkProps, socialLinkProps } from "@/@types/types";
import { FillFacebook, FillInstagram } from "@/icons/icons";

export const imageUrl =
  "https://eazotel-client-webp-image.s3.ap-south-1.amazonaws.com/aaoji/";

export const NavLink: navLinkProps[] = [
  {
    id: 1,
    label: "home",
    href: "#",
  },
  {
    id: 2,
    label: "About us",
    href: "#about",
  },
  {
    id: 3,
    label: "Menu",
    href: "#menu",
  },
  {
    id: 4,
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    id: 5,
    label: "gallery",
    href: "#gallery",
  },
];

export const SocialLink: socialLinkProps[] = [
  {
    id: 1,
    label: "instagram",
    icon: <FillInstagram />,
    href: "https://www.instagram.com/aaoji_restaurant_cafe_bilaspur/",
  },
  // {
  //   id: 2,
  //   label: "twitter",
  //   icon: <FillTwitter />,
  //   href: "https://x.com/",
  // },
  {
    id: 3,

    label: "facebook",
    icon: <FillFacebook />,
    href: "https://www.facebook.com/AaojiSAH",
  },
];

export const FooterLink: footerLinkProps[] = [
  {
    id: 1,
    title: "quick links",
    links: [
      {
        id: 1,
        label: "About us",
        href: "#about",
      },
      {
        id: 2,
        label: "Menu",
        href: "#menu",
      },
      {
        id: 3,
        label: "Testimonials",
        href: "#testimonials",
      },
      {
        id: 4,
        label: "Gallery",
        href: "#gallery",
      },
    ],
  },
  {
    id: 2,
    title: "get in touch",
    links: [
      {
        id: 1,
        title: "address",
        label:
          "Aaoji Restaurant, Road, Vill, Dhanora, Bilaspur, Uttar Pradesh 244923",
        href: "#",
        // href: "https://maps.app.goo.gl/BoRStMAF63aWh4x79",
      },
      {
        id: 2,
        title: "email",
        label: "operations.elanmall@moets.com",
        href: "mailto:aaojirestaurantnh9@gmail.com",
      },
      {
        id: 3,
        title: "call",
        label: "+91 95997 99429",
        href: "tel:+919599799429",
      },
    ],
  },
  {
    id: 3,
    title: "opening hours",
    links: [
      {
        id: 1,
        label: "Mon to Sun",
        href: "8AM – 12AM",
      },
    ],
  },
];
