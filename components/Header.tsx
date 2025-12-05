import Link from "next/link";
import HeaderThemeSwitch from "./HeaderThemeSwitch";
import { GET_CONFIG_QUERYResult } from "@/sanity.types";
import HeaderNavHorizontal from "./HeaderNavHorizontal";
import { imageURL } from "@/lib/imageURL";
import Image from "next/image";
import HeaderNavVertical from "./HeaderNavVertical";

async function Header({ config }: { config: NonNullable<GET_CONFIG_QUERYResult> }) {
  // Transform headerLinks to convert null icons to undefined
  const headerLinks = (config?.headerLinks || []).map(link => ({
    ...link,
    icon: link.icon ?? undefined
  }));

  return (
    <header className="navbar bg-base-100/30 backdrop-blur-lg font-mono border-b-base-content border-b-[1px] sticky top-0 z-50">
      <a href="#content" className="sr-only focus:not-sr-only">Skip to main content</a>
      <div className="flex flex-row items-center flex-1">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            {config?.title && (<span>{config.title}</span>)}
            {config?.headerLogo && (
              <Image src={imageURL(config.headerLogo).url()} alt={config.headerLogoAlt || config.title || 'Header Logo'} width={100} height={100} />
            )}
          </Link>
        </div>
        {/* <HeaderLangSwitch /> */}
        <HeaderThemeSwitch />
        <HeaderNavVertical links={headerLinks} />
        <HeaderNavHorizontal links={headerLinks} />
      </div>
    </header >
  )
}

export default Header
