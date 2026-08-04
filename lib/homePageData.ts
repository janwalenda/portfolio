import { getAllPosts } from "@/sanity/lib/blog/getAllPosts";
import { getHomepage } from "@/sanity/lib/homepage/getHomepage";
import { getPageBySlug } from "@/sanity/lib/page/getPageBySlug";
import { type CardWithExpandedAction } from "@/components/GridItem";

function getProjectCards(
  projectsPage: Awaited<ReturnType<typeof getPageBySlug>>,
  selectedWorkCount: number,
) {
  if (!projectsPage?.content) {
    return [];
  }

  return projectsPage.content
    .filter((content) => content._type === "grid")
    .flatMap((content) =>
      content._type === "grid" ? (content.components ?? []) : [],
    )
    .filter(Boolean)
    .slice(0, selectedWorkCount) as CardWithExpandedAction[];
}

export async function getHomePageData() {
  const homepage = await getHomepage();
  const projectsPage = await getPageBySlug("projects");
  const posts = await getAllPosts("desc");
  const selectedWorkCount = homepage?.selectedWorkCount || 6;

  return {
    homepage,
    latestPosts: posts.slice(0, 3),
    projectCards: getProjectCards(projectsPage, selectedWorkCount),
  };
}
