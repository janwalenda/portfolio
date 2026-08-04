import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import {
  type GET_ALL_PAGES_QUERY_RESULT,
  type GET_ALL_POSTS_QUERY_ASC_RESULT,
  type GET_CONFIG_QUERY_RESULT,
} from "@/sanity.types";
import CommandMenu from "./CommandMenu";
import { DisableDraftMode } from "./DisableDraftMode";
import Footer from "./Footer";
import Header from "./Header";
import JsonLd from "./JsonLd";
import ThemeProvider from "./ThemeProvider";
import WinterSeasonEvent from "./WinterSeasonEvent";
import { SanityLive } from "@/sanity/lib/live";
import { cn } from "@/lib/utils";

export default async function PortfolioLayoutShell({
  children,
  config,
  pages,
  posts,
  structuredData,
}: {
  children: React.ReactNode;
  config: GET_CONFIG_QUERY_RESULT;
  pages: GET_ALL_PAGES_QUERY_RESULT;
  posts: GET_ALL_POSTS_QUERY_ASC_RESULT;
  structuredData: Record<string, unknown>[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <body className={cn("font-roboto", "antialiased relative")}>
      <ThemeProvider>
        <JsonLd data={structuredData} />
        {config && <Header config={config} />}
        <WinterSeasonEvent />
        <CommandMenu pages={pages} posts={posts} />
        <main
          id="content"
          className="bg-base-100 relative border-b border-b-base-content flex flex-col items-center justify-center min-h-screen"
        >
          {children}
        </main>
        {config && <Footer config={config} />}
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </ThemeProvider>
    </body>
  );
}
