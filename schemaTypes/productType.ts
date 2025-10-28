import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A short subtitle or tagline for the product.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used for previews and SEO.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          {title: 'Physical', value: 'physical'},
          {title: 'Digital', value: 'digital'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'age_range',
      title: 'Age Range',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '3-5 years', value: '3-5'},
          {title: '6-8 years', value: '6-8'},
          {title: '9-12 years', value: '9-12'},
          {title: 'All Ages', value: 'all'},
          {title: 'Adults', value: 'adult'},
        ],
        layout: 'list',
      },
      validation: (rule) =>
        rule.required().min(1).custom((value) => {
          if (!value) return true
          const allowed = ['3-5', '6-8', '9-12', 'all', 'adult'] as const
          const invalid = value.filter((item: unknown) => !allowed.includes(item as never))
          return invalid.length === 0 || 'Select from the provided age ranges.'
        }),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'External referral URL (Amazon, Shopify, etc.)',
      validation: (rule) => rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seoMetadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      category: 'category.title',
      type: 'type',
    },
    prepare({title, images, category, type}) {
      const media = Array.isArray(images) && images.length > 0 ? images[0] : undefined
      return {
        title,
        subtitle: `${category} • ${type}`,
        media,
      }
    },
  },
})
