import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Resource',
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
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock keeping unit identifier',
      validation: (rule) => rule.required(),
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used for previews and SEO.',
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
      to: [{type: 'resourceCategory'}],
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
      name: 'is_gated',
      title: 'Is Gated',
      type: 'boolean',
      description: 'TRUE = Requires email capture; FALSE = Instant download',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instant_pdf',
      title: 'Instant PDF',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: '.pdf,.zip',
          },
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
      description: 'PDF or ZIP files for instant download (when is_gated is FALSE)',
      hidden: ({document}) => document?.is_gated === true,
    }),
    defineField({
      name: 'gated_pdf',
      title: 'Gated PDF',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: '.pdf,.zip',
          },
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
      description: 'PDF or ZIP files for gated download (when is_gated is TRUE)',
      hidden: ({document}) => document?.is_gated === false,
    }),
    defineField({
      name: 'lead_form_id',
      title: 'Lead Form ID',
      type: 'string',
      description: 'External email provider form ID (required for gated resources)',
      hidden: ({document}) => document?.is_gated === false,
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
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seoMetadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sku: 'sku',
      images: 'images',
      category: 'category.title',
      is_gated: 'is_gated',
    },
    prepare({title, sku, images, category, is_gated}) {
      const media = Array.isArray(images) && images.length > 0 ? images[0] : undefined
      return {
        title: sku ? `${sku} - ${title}` : title,
        subtitle: `${category ?? 'Uncategorized'} • ${is_gated ? 'Gated' : 'Instant'}`,
        media,
      }
    },
  },
})
