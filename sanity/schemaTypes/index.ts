import { type SchemaTypeDefinition } from 'sanity'
import { siteSettingsType } from './siteSettingsType'
import { linkType } from './linkType'
import { heroType } from './heroType'
import { faqType } from './faqType'
import { faqsType } from './faqsType'
import { featuresType } from './featuresType'
import { pageBuilderType } from './pageBuilderType'
import { pageType } from './pageType'
import { blockContentType } from './blockContentType'
import { splitImageType } from './splitImageType'
import { categoryType } from './categoryType'
import { authorType } from './authorType'
import { postType } from './postType'
import { cardType } from './cardType'
import { gridType } from './gridType'
import { footerColBuilderType } from './footerColBuilderType'
import { textBlockType } from './textBlockType'
import { seoType } from './seoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    siteSettingsType,
    splitImageType,
    linkType,
    heroType,
    faqType,
    faqsType,
    featuresType,
    pageBuilderType,
    pageType,
    categoryType,
    authorType,
    postType,
    cardType,
    textBlockType,
    gridType,
    footerColBuilderType,
    seoType,
  ],
}
