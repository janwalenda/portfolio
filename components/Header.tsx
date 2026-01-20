import Link from "next/link";
import HeaderThemeSwitch from "./HeaderThemeSwitch";
import { type GET_CONFIG_QUERY_RESULT } from "@/sanity.types";
import HeaderNavHorizontal from "./HeaderNavHorizontal";
import { imageURL } from "@/lib/imageURL";
import Image from "next/image";
import HeaderNavVertical from "./HeaderNavVertical";
import Search from "./Search";
import { H4 } from "./ui/heading";
import { Button } from "./ui/button";

async function Header({ config }: { config: NonNullable<GET_CONFIG_QUERY_RESULT> }) {
  // Transform headerLinks to convert null icons to undefined
  const headerLinks = (config?.headerLinks || []).map(link => ({
    ...link,
    icon: link.icon ?? undefined
  }));

  return (
    <header className="navbar bg-base-100/30 backdrop-blur-lg border-b-base-content border-b sticky top-0 z-50">
      <a href="#content" className="sr-only focus:not-sr-only">Skip to main content</a>
      <div className="flex flex-row items-center flex-1">
        <div className="flex-1">
          <Button asChild>
            <Link href="/">
              {config?.title && (<H4>{config.title}</H4>)}
              {config?.headerLogo && (
                <Image src={imageURL(config.headerLogo).url()} alt={config.headerLogoAlt || config.title || "Header Logo"} width={100} height={100} />
              )}
            </Link>
          </Button>
        </div>
        {/* <HeaderLangSwitch /> */}
        <HeaderThemeSwitch />
        <Search />
        <HeaderNavVertical links={headerLinks} />
        <HeaderNavHorizontal links={headerLinks} />
      </div>
    </header>
  )
}

export default Header
