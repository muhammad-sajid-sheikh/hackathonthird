import { type SchemaTypeDefinition } from 'sanity'

import author from './author'
import post from './blog'
import { product } from './product'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author,
    post,
    product,
    order
  ],
}
