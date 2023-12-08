export const API = {
  topPage: {
    // find: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    find: process.env.NEXT_PUBLIC_DOMAIN + '/firstCategory',
    byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/byAlias/',
    // byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/',
  },
  product: {
    // find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    find: process.env.NEXT_PUBLIC_DOMAIN + '/product',
  },
  review: {
    createDemo: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create-demo',
  }
}