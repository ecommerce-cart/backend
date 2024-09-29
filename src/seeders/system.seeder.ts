import bcrypt from 'bcrypt'
import prismaClient from '../clients/prisma.client'
import { blackTippedPolloImages, creamyTippedPolloImages, greenTippedPolloImages } from '../../dummy/images.dummy'
import { getAddresses } from '../../dummy/addresses.dummy'
import { generateRefreshToken } from '../services/lib/jwt.service'

const prisma = prismaClient

const tableNames = [
  // 'Vendor',
  'Customer',
  'Category',
  'Product',
  'ProductCategory',
  'VariationType',
  'ProductVariationType',
  'Variation',
  'Cart',
  'AvailableStock',
  'Media',
  'Country',
  'City',
  'Address',
]

async function truncate() {
  for (const tableName of tableNames) await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`)
}

export const seed = async () => {
  await truncate()

  await prisma.customer.create({
    data: {
      email: 'taha.mohamed@cart.com',
      name: 'Taha Mohamed',
      password: await bcrypt.hash('123123', 10),
      phone: '01507717263',
      refreshToken: generateRefreshToken({ email: 'taha.mohamed@cart.com' }),
    },
  })

  const country = await prisma.country.create({
    data: {
      name: 'Egypt',
      code: 'EG',
    },
  })

  await prisma.city.createMany({
    data: getAddresses().map((address) => ({
      name: address.name,
      code: address.code,
      countryId: country.id,
    })),
  })

  await prisma.category.createMany({
    data: [
      {
        name: 'Mens',
      },
      {
        name: 'Women',
      },
    ],
  })

  await prisma.product.createMany({
    data: [
      {
        name: 'Tipped Polo',
        price: 100 * 270,
        details:
          'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.Z',
      },
      // {
      //   name: 'Basic Polo',
      //   price: 100 * 250,
      //   details:
      //     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      //   description:
      //     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.Z',
      // },
    ],
  })

  const products = await prisma.product.findMany({})

  // Create one grandparent variation for the first product
  await prisma.variationType.createMany({
    data: [{ name: 'Material' }, { name: 'Color', component: 'color' }, { name: 'size' }],
  })

  await prisma.variation.createMany({
    data: [
      {
        id: 1,
        name: 'Cotton',
        variationTypeId: 1, // material
        slug: 'cotton',
      },
      {
        id: 2,
        name: 'Soft',
        variationTypeId: 1, // material
        slug: 'soft',
      },
      {
        id: 3,
        name: 'Off White',
        slug: 'off-white',
        value: '#F6EFE9',
        variationTypeId: 2, // color
      },
      {
        id: 4,
        name: 'Black',
        slug: 'black',
        value: '#000000',
        variationTypeId: 2, // color
      },
      {
        id: 5,
        name: 'Green',
        slug: 'green',
        value: '#A7E3D2',
        variationTypeId: 2, // color
      },
      {
        id: 6,
        name: 'Red',
        slug: 'red',
        value: '#FF0000',
        variationTypeId: 2, // color
      },
      {
        id: 7,
        name: 'S',
        variationTypeId: 3, // size
        slug: 's',
      },
      {
        id: 8,
        name: 'M',
        variationTypeId: 3, // size
        slug: 'm',
      },
      {
        id: 9,
        name: 'L',
        variationTypeId: 3, // size
        slug: 'l',
      },
      {
        id: 10,
        name: 'XL',
        variationTypeId: 3, // size
        slug: 'xl',
      },
    ],
  })

  await prisma.productVariationType.createMany({
    data: [
      {
        id: 1, // Material
        productId: 1,
        variationTypeId: 1,
      },
      {
        id: 2, // Color
        productId: 1,
        variationTypeId: 2,
      },
      {
        id: 3, // Size
        productId: 1,
        variationTypeId: 3,
      },
    ],
  })

  const productToVariationMapper = {
    1: [
      { variationId: 1, price: 100 * 270, productVariationTypeId: 1 }, // 1- Cotton
      { variationId: 2, price: 100 * 270, productVariationTypeId: 1 }, // 2- Soft

      { variationId: 3, price: 100 * 270, productVariationTypeId: 2, parentId: 1 }, // 3- Cotton - Off White
      { variationId: 4, price: 100 * 270, productVariationTypeId: 2, parentId: 1 }, // 4- Cotton - Black
      { variationId: 5, price: 100 * 270, productVariationTypeId: 2, parentId: 1 }, // 5- Cotton - Green
      { variationId: 6, price: 100 * 270, productVariationTypeId: 2, parentId: 1 }, // 6- Cotton - Red

      { variationId: 7, price: 100 * 270, productVariationTypeId: 3, parentId: 3 }, // 7- Cotton - Off White - S
      { variationId: 8, price: 100 * 270, productVariationTypeId: 3, parentId: 3 }, // 8- Cotton - Off White - M
      { variationId: 9, price: 100 * 270, productVariationTypeId: 3, parentId: 3 }, // 9- Cotton - Off White - L

      { variationId: 7, price: 100 * 270, productVariationTypeId: 3, parentId: 5 }, // 10- Cotton - Green - S
      { variationId: 8, price: 100 * 270, productVariationTypeId: 3, parentId: 5 }, // 11- Cotton - Green - M
      { variationId: 9, price: 100 * 270, productVariationTypeId: 3, parentId: 5 }, // 12- Cotton - Green - L

      { variationId: 3, price: 100 * 270, productVariationTypeId: 2, parentId: 2 }, // 13- Soft - Off White
      { variationId: 4, price: 100 * 270, productVariationTypeId: 2, parentId: 2 }, // 14- Soft - Black

      { variationId: 7, price: 100 * 270, productVariationTypeId: 3, parentId: 13 }, // 15- Soft - Off White - S
      { variationId: 8, price: 100 * 270, productVariationTypeId: 3, parentId: 13 }, // 16- Soft - Off White - M

      { variationId: 7, price: 100 * 270, productVariationTypeId: 3, parentId: 14 }, // 17- Soft - Black - S
      { variationId: 8, price: 100 * 270, productVariationTypeId: 3, parentId: 14 }, // 18- Soft - Black - M
      { variationId: 9, price: 100 * 270, productVariationTypeId: 3, parentId: 14 }, // 19- Soft - Black - L
    ],
  }

  for (const productId in productToVariationMapper) {
    await prisma.productVariation.createMany({
      data: productToVariationMapper[productId].map((pv) => ({
        ...pv,
        productId: Number(productId),
      })),
    })
  }

  await prisma.media.createMany({
    data: [
      ...creamyTippedPolloImages.map((img) => ({
        ...img,
        objectId: products[0].id,
      })),
      ...blackTippedPolloImages.map((img) => ({
        ...img,
        objectId: products[0].id,
      })),
      ...greenTippedPolloImages.map((img) => ({
        ...img,
        objectId: products[0].id,
      })),
      // ...orangeBasicPolloImages.map((img) => ({
      //   ...img,
      //   objectId: products[1].id,
      // })),
      // ...redBasicPolloImages.map((img) => ({
      //   ...img,
      //   objectId: products[1].id,
      // })),
    ],
  })

  const productVariations = await prisma.productVariation.findMany({})

  await prisma.availableStock.createMany({
    data: productVariations.map((pv) => ({
      quantity: 5,
      variationId: pv.id,
    })),
  })
}

seed()

// const branch = await prisma.branch.create({
//   data: {
//     name: 'Haram',
//     phone: '01507717263',
//     phone2: '01507717261',
//     address: '4 Haram street',
//     vendorId: vendor.id,
//   },
// })

// const store = await prisma.store.create({
//   data: {
//     branchId: branch.id,
//   },
// })
