import {defineArrayMember, defineType} from 'sanity'

/** Texte riche simple : paragraphes, intertitres, gras, italique, liens. */
export const texteRiche = defineType({
  name: 'texteRiche',
  title: 'Texte',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        {title: 'Intertitre', value: 'h3'},
      ],
      lists: [{title: 'Liste à puces', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'Adresse',
                description: 'Une page du site (ex. /accompagnement) ou une adresse complète (https://…).',
                validation: (rule) => rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              },
            ],
          },
        ],
      },
    }),
  ],
})
