import {defineField, defineType} from 'sanity'

export const seoMetadata = defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'seo_title',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom SEO title for search results (max 60 characters)',
      validation: (rule) => rule.max(60).warning('SEO titles should be under 60 characters for optimal display'),
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      description: 'Custom description for search snippet (max 160 characters)',
      validation: (rule) => rule.max(160).warning('Meta descriptions should be under 160 characters for optimal display'),
    }),
    defineField({
      name: 'og_image',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image used when the link is shared on social media',
      options: {
        hotspot: true,
      },
    }),
  ],
})
