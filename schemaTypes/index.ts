import { postType } from "./postType"
import { productType } from "./productType"
import { resourceType } from "./resourceType"
import { pageType } from "./pageType"
import { leadType } from "./leadType"
import { homeProductsEditorialType, homeResourcesEditorialType } from "./homeEditorialType"
import { seoMetadata } from "./seoMetadata"
import { postCategory, productCategory, resourceCategory } from "./categories"

export const schemaTypes = [
  // Object types
  seoMetadata,
  
  // Document types
  postType,
  productType,
  resourceType,
  pageType,
  leadType,
  homeProductsEditorialType,
  homeResourcesEditorialType,
  
  // Category types
  postCategory,
  productCategory,
  resourceCategory,
]
