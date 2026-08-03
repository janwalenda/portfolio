"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
} from "./ui/command";
import { useSearchStore } from "@/store/search";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { type Page, type Post } from "@/sanity.types";

export default function CommandMenu({
  pages,
  posts,
}: {
  pages: Page[];
  posts: Post[];
}) {
  const { open, setOpen } = useSearchStore();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const go = (path: string) => () => {
    setOpen(false);
    router.replace(path);
  };

  // Mount only when open to avoid Radix useId hydration mismatches
  // (e.g. Sanity Presentation Mode changes the React tree).
  if (!open) {
    return null;
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="bg-base-200 rounded-box"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem key={page._id} onSelect={go(`/${page.slug?.current}`)}>
              <span>{page.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Posts">
          {posts.map((post) => (
            <CommandItem
              key={post._id}
              onSelect={go(`/blog/${post.slug?.current}`)}
            >
              <span>{post.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => {
              setTheme(isDark ? "light" : "dark");
              setOpen(false);
            }}
          >
            <span>Toggle Theme</span>
            <Icon
              icon={isDark ? "heroicons:sun-solid" : "heroicons:moon-solid"}
              className="size-5 fill-accent-content"
            />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
