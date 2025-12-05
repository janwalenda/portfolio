import { Icon } from "@iconify/react";

export default function HeaderThemeSwitch() {
  return (
    <label className="swap swap-rotate btn btn-ghost">
      <input type="checkbox" className="theme-controller" value="dark" />
      <Icon icon="heroicons:sun" className="swap-off size-5 fill-current" />
      <Icon icon="heroicons:moon" className="swap-on size-5 fill-current" />
    </label>
  )
}