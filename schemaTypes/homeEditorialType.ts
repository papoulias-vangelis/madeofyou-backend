import {defineField, defineType} from 'sanity'

export const homeProductsEditorialType = defineType({
  name: 'homeProductsEditorial',
  title: 'Home Products Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      description: 'Drag and drop to reorder products for the home page',
      of: [
        {
          type: 'object',
          name: 'productItem',
          fields: [
            {
              name: 'product',
              type: 'reference',
              to: [{type: 'product'}],
              options: {
                filter: ({document}) => {
                  const selectedIds = (document.products || [])
                    .map((item: any) => item.product?._ref)
                    .filter(Boolean)
                  return {
                    filter: '!(_id in $selectedIds)',
                    params: {selectedIds},
                  }
                },
              },
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'product.title',
              category: 'product.category.title',
              images: 'product.images',
              type: 'product.type',
            },
            prepare({title, category, images, type}) {
              const media = Array.isArray(images) && images.length > 0 ? images[0] : undefined
              return {
                title: title || 'Untitled Product',
                subtitle: category ? `${category} • ${type}` : type,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      productCount: 'products.length',
    },
    prepare({productCount}) {
      return {
        title: 'Home Products Editorial',
        subtitle: `${productCount || 0} products selected`,
      }
    },
  },
})

export const homeResourcesEditorialType = defineType({
  name: 'homeResourcesEditorial',
  title: 'Home Resources Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      description: 'Drag and drop to reorder resources for the home page',
      of: [
        {
          type: 'object',
          name: 'resourceItem',
          fields: [
            {
              name: 'resource',
              type: 'reference',
              to: [{type: 'resource'}],
              options: {
                filter: ({document}) => {
                  const selectedIds = (document.resources || [])
                    .map((item: any) => item.resource?._ref)
                    .filter(Boolean)
                  return {
                    filter: '!(_id in $selectedIds)',
                    params: {selectedIds},
                  }
                },
              },
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'resource.title',
              sku: 'resource.sku',
              category: 'resource.category.title',
              images: 'resource.images',
              isGated: 'resource.is_gated',
            },
            prepare({title, sku, category, images, isGated}) {
              const media = Array.isArray(images) && images.length > 0 ? images[0] : undefined
              return {
                title: sku ? `${sku} - ${title}` : title || 'Untitled Resource',
                subtitle: category ? `${category} • ${isGated ? 'Gated' : 'Instant'}` : isGated ? 'Gated' : 'Instant',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      resourceCount: 'resources.length',
    },
    prepare({resourceCount}) {
      return {
        title: 'Home Resources Editorial',
        subtitle: `${resourceCount || 0} resources selected`,
      }
    },
  },
})
