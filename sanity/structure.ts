import type { StructureResolver } from 'sanity/structure'
import { Settings2Icon } from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('CMS')
    .items([
      S.listItem()
        .title('Config')
        .icon(Settings2Icon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "page",
            "faq",
            "siteSettings",
            "header",
            "footerColBuilder",
            "gridBuilder"
          ].includes(item.getId()!)
      ),
    ])
