/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import type * as Solid from "solid-js";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

// Icons

import { FiAtSign, FiHome, FiUsers, FiSmartphone } from "solid-icons/fi";
import { IoMapOutline } from "solid-icons/io";
import { MdFillNot_listed_location } from "solid-icons/md";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: Solid.JSX.Element }) {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <div class="p-2 flex flex-row gap-2 text-2xl">
          <Link
            to="/"
            class="flex items-center gap-1"
            activeProps={{
              class: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            <FiHome />
            Home
          </Link>{" "}
          <Link
            to="/posts"
            class="flex items-center gap-1"
            activeProps={{
              class: "font-bold",
            }}
          >
            <FiSmartphone />
            Posts
          </Link>{" "}
          <Link
            to="/users"
            class="flex items-center gap-1"
            activeProps={{
              class: "font-bold",
            }}
          >
            <FiUsers />
            Users
          </Link>{" "}
          <Link
            to="/route-a"
            class="flex items-center gap-1"
            activeProps={{
              class: "font-bold",
            }}
          >
            <IoMapOutline />
            Layout
          </Link>{" "}
          <Link
            to="/deferred"
            class="flex items-center gap-1"
            activeProps={{
              class: "font-bold",
            }}
          >
            <FiAtSign />
            Deferred
          </Link>{" "}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            class="flex items-center gap-1"
            activeProps={{
              class: "font-bold",
            }}
          >
            <MdFillNot_listed_location />
            Not found
          </Link>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
