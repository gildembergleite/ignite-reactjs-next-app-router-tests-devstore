import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import Image from 'next/image'

export const runtime = 'edge'

export const alt = ''

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  })

  const product = await response.json()

  return product
}

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return (
    <Image
      src={productImageURL}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-full bg-zinc-950"
      alt=""
    />
  )
}
