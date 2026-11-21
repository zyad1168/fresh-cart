export interface ICart {
  count: number
  _id: string
  product: ProductCart
  price: number
}

export interface ProductCart {
  subcategory: Subcategory[]
  _id: string
  title: string
  slug: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

