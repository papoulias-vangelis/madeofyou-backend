import {defineField, defineType} from 'sanity'

export const leadType = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .email()
          .error('A valid email address is required'),
    }),
    defineField({
      name: 'resource',
      title: 'Resource',
      type: 'reference',
      to: [{type: 'resource'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'string',
      description: 'Campaign name or source (e.g., "landing page", "newsletter")',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      resourceTitle: 'resource.title',
      submittedAt: 'submittedAt',
    },
    prepare({name, email, resourceTitle, submittedAt}) {
      const formattedDate = submittedAt
        ? new Date(submittedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Unknown'
      return {
        title: name || email,
        subtitle: `${email}${name ? '' : ''} • ${resourceTitle ?? 'No Resource'} • ${formattedDate}`,
      }
    },
  },
})
