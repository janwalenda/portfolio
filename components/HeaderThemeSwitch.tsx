"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function HeaderThemeSwitch() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return <span className="btn btn-ghost btn-square size-10" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="swap swap-rotate btn btn-ghost"
      aria-label={isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon
        icon={isDark ? "heroicons:sun" : "heroicons:moon"}
        className="size-5 fill-current"
      />
    </button>
  );
}
