import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, products } from '../../../data/products'
import ProductDetail from './ProductDetail'

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  const related = getRelatedProducts(product)
  return <ProductDetail product={product} related={related} />
}
