import { GetServerSideProps } from 'next'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'
import { useShoppingCart } from '../hooks/useShoppingCart'
import { stripe } from '../lib/stripe'
import { ImageContainer, ImageDiv, SuccessContainer } from '../styles/pages/success'
import { useEffect, useState } from 'react'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
  productsImages: string[]
}

export default function Success({ customerName, product, productsImages }: SuccessProps) {
  const quant = productsImages?.length > 1 ? 'camisetas' : 'camiseta'

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageDiv>
          {productsImages?.map((item, index) => {
            return (
              <ImageContainer key={index}>
                <Image src={item} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ImageDiv>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>
            {productsImages?.length} {quant}
          </strong>{' '}
          já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catalogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  // const product = session.line_items.data[0].price.product as Stripe.Product
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      customerName,
      productsImages,
    },
  }
}
