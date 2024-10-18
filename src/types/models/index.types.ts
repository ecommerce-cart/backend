export interface Customer {
  id: number
  email: string
  phone?: string | null
  name: string
  password: string
  refreshToken?: string | null
  createdAt: Date
  updatedAt: Date
  orders: Order[]
  cart?: Cart | null
  addresses: Address[]
}

export interface Category {
  id: number
  name: string
  parentId?: number | null
  createdAt: Date
  updatedAt: Date
  parent?: Category | null
  children: Category[]
  products: ProductCategory[]
}

export interface Product {
  id: number
  name: string
  price: number
  description?: string | null
  details?: string | null
  createdAt: Date
  updatedAt: Date
  productVariations: ProductVariation[]
  categories: ProductCategory[]
  productVariationTypes: ProductVariationType[]
  orderProduct: OrderProduct[]
  cartProduct: CartProduct[]
}

export interface ProductCategory {
  productId: number
  categoryId: number
  product: Product
  category: Category
}

export interface VariationType {
  id: number
  name: string
  component: string
  required: boolean
  createdAt: Date
  updatedAt: Date
  variations: Variation[]
  productVariationType: ProductVariationType[]
}

export interface Variation {
  id: number
  name: string
  slug: string
  value?: string | null
  variationTypeId: number
  variationType: VariationType
  productVariations: ProductVariation[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariationType {
  id: number
  product: Product
  variationType: VariationType
  productVariations: ProductVariation[]
  productId: number
  variationTypeId: number
}

export interface ProductVariation {
  id: number
  price: number
  createdAt: Date
  updatedAt: Date
  parentId?: number | null
  variationId: number
  productVariationTypeId: number
  productId: number
  parent?: ProductVariation | null
  children: ProductVariation[]
  variation: Variation
  productVariationType: ProductVariationType
  product?: Product | null
  orderVariations: OrderVariation[]
  stocks: Stock[]
  availableStock?: AvailableStock | null
  cartProductVariations: CartProductVariation[]
}

export interface Stock {
  id: number
  variationId: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  productVariation: ProductVariation
}

export interface AvailableStock {
  id: number
  variationId: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  productVariation: ProductVariation
}

export interface Cart {
  id: number
  customerId: number
  createdAt: Date
  updatedAt: Date
  customer: Customer
  cartProducts: CartProduct[]
}

export interface CartProduct {
  id: number
  productId: number
  cartId: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: Product
  cart: Cart
  variations: CartProductVariation[]
}

export interface CartProductVariation {
  variationId: number
  quantity: number
  cartProductId: number
  cartProduct: CartProduct
  productVariation: ProductVariation
}

export interface Order {
  id: number
  customerId?: number | null
  createdAt: Date
  updatedAt: Date
  customer?: Customer | null
  orderProducts: OrderProduct[]
  orderStatuses: OrderStatus[]
}

export interface OrderStatus {
  id: number
  orderId: number
  status: number
  createdAt: Date
  updatedAt: Date
  order: Order
}

export interface OrderProduct {
  id: number
  productId: number
  orderId: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: Product
  order: Order
  orderVariations: OrderVariation[]
}

export interface OrderVariation {
  id: number
  variationId: number
  orderProductId: number
  createdAt: Date
  updatedAt: Date
  orderProduct: OrderProduct
  productVariation: ProductVariation
}

export interface Media {
  id: number
  filename: string
  mimetype: string
  encoding: string
  url: string
  size: number
  objectId: number
  objectType: string
  createdAt: Date
  updatedAt: Date
}

export interface Country {
  id: number
  name: string
  code: string
  addresses: Address[]
  cities: City[]
}

export interface City {
  id: number
  name: string
  code: string
  countryId: number
  addresses: Address[]
  country: Country
}

export interface Address {
  id: number
  customerId: number
  default: boolean
  street1: string
  street2?: string | null
  state: string
  cityId: number
  zipCode?: string | null
  city: City
  country: Country
  customer: Customer
}
