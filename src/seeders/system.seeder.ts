import bcrypt from 'bcrypt'
import prismaClient from '../clients/prisma.client'
import {
  blackTippedPolloImages,
  creamyTippedPolloImages,
  greenTippedPolloImages,
} from '../../dummy/images.dummy'
import { getAddresses } from '../../dummy/addresses.dummy'
import { generateRefreshToken } from '../services/lib/jwt.service'

const prisma = prismaClient

const createColorVariationsFor = async (
  productId: number,
  materialName: 'Cotton' | 'Soft'
) => {
  const parentId = (
    await prisma.variation.findFirst({
      where: {
        name: materialName,
      },
    })
  ).id

  return prisma.variation.createMany({
    data: [
      {
        name: 'Off White',
        value: '#F6EFE9',
        slug: 'off-white',
        price: 100 * 270,
        typeId: 2, // color
        productId,
        parentId,
      },
      {
        name: 'Black',
        value: '#292238',
        slug: 'black',
        price: 100 * 270,
        typeId: 2,
        productId,
        parentId,
      },
      {
        name: materialName === 'Cotton' ? 'Green' : 'Red',
        value: materialName === 'Cotton' ? '#A7E3D2' : 'red',
        slug: materialName === 'Cotton' ? 'green' : 'red',
        price: 100 * 270,
        typeId: 2,
        productId,
        parentId,
      },
    ],
  })
}

const createSizeVariationsFor = async (
  productId: number,
  colorSlug: 'off-white' | 'black' | 'green' | 'red'
) => {
  const parentIds = (
    await prisma.variation.findMany({
      where: {
        slug: colorSlug,
      },
    })
  ).map((v) => v.id)

  return Promise.all(
    parentIds.map((parentId) =>
      prisma.variation.createMany({
        data: [
          {
            name: 'S',
            price: 100 * 270,
            parentId,
            productId,
            typeId: 3, // size
          },
          {
            name: 'M',
            price: 100 * 270,
            parentId,
            productId,
            typeId: 3, // size
          },
          {
            name: colorSlug === 'red' ? 'XL' : 'L',
            price: 100 * 270,
            parentId,
            productId,
            typeId: 3, // size
          },
        ],
      })
    )
  )
}

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
  for (const tableName of tableNames)
    await prisma.$queryRawUnsafe(
      `Truncate "${tableName}" restart identity cascade;`
    )
}

export const seed = async () => {
  await truncate()

  const customer = await prisma.customer.create({
    data: {
      email: 'taha.mohamed@cart.com',
      name: 'Taha Mohamed',
      password: await bcrypt.hash('123123', 10),
      phone: '01507717263',
      refreshToken: generateRefreshToken({ email: 'taha.mohamed@cart.com' })
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

  const categories = await prisma.category.createMany({
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
    data: [
      { name: 'Material' },
      { name: 'Color', component: 'color' },
      { name: 'size' },
    ],
  })

  await prisma.productVariationType.createMany({
    data: [
      {
        productId: 1,
        variationTypeId: 1,
      },
      {
        productId: 1,
        variationTypeId: 2,
      },
      {
        productId: 1,
        variationTypeId: 3,
      },
    ],
  })

  await prisma.variation.createMany({
    data: [
      {
        name: 'Soft',
        price: 100 * 270,
        typeId: 1,
        productId: 1,
        slug: 'soft',
      },
      {
        name: 'Cotton',
        price: 100 * 270,
        typeId: 1,
        productId: 1,
        slug: 'cotton',
      },
    ],
  })

  await createColorVariationsFor(1, 'Soft')
  await createColorVariationsFor(1, 'Cotton')

  await createSizeVariationsFor(1, 'off-white')
  await createSizeVariationsFor(1, 'black')
  await createSizeVariationsFor(1, 'green')
  await createSizeVariationsFor(1, 'red')

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

  const variations = await prisma.variation.findMany({})

  await Promise.all(
    variations.map((v) =>
      prisma.availableStock.create({
        data: {
          quantity: 5,
          variationId: v.id,
        },
      })
    )
  )
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
