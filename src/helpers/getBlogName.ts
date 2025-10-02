export function getBlogName(id?: string): string {
  const blogNameRegex = /(?<=\/)(\w+)(?=.md)/;
  if (id && blogNameRegex.test(id)) {
    const match = blogNameRegex.exec(id);

    return match && match.length > 0 ? match[0] : "";
  }

  return "";
}
