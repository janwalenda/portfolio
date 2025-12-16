"use client";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, CommandShortcut } from "./ui/command";
import { useSearchStore } from "@/store/search";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/theme";
import { Icon } from "@iconify/react";
import { Page, Post } from "@/sanity.types";

export default function CommandMenu({ pages, posts }: { pages: Page[], posts: Post[] }) {
  const { open, setOpen } = useSearchStore();
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="bg-base-200/60 backdrop-blur-lg rounded-box">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem key={page._id} onSelect={() => router.replace(`/${page.slug?.current}`)}>
              <span>{page.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Posts">
          {posts.map((post) => (
            <CommandItem key={post._id} onSelect={() => router.replace(`/blog/${post.slug?.current}`)}>
              <span>{post.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={handleThemeChange}>
            <span>Toggle Theme</span>
            {theme === "dark"
              ? (
                <Icon icon="heroicons:sun-solid" className="size-5 fill-accent-content" />
              )
              : (
                <Icon icon="heroicons:moon-solid" className="size-5 fill-accent-content" />
              )}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )

}