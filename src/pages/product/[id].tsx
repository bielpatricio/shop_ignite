import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '../../styles/pages/product'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import Head from 'next/head'
import { ProductItem } from '../../reducers/Cart/reducer'
import { useShoppingCart } from '../../hooks/useShoppingCart'

interface ProductProps {
  product: ProductItem
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addNewItem } = useShoppingCart()

  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
  //   useState(false)

  function handleBuyProduct() {
    // alert(`Camisa com id ${product.defaultPriceId} foi adicionado ao carrinho`)
    // try {
    //   setIsCreatingCheckoutSession(true)
    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.defaultPriceId,
    //   })

    //   const { checkoutUrl } = response.data

    //   window.location.href = checkoutUrl
    // } catch (erro) {
    //   setIsCreatingCheckoutSession(false)
    //   alert('Falha ao redirecionar a pagina')
    // }
    const newItem = {
      ...product,
      amount: 1,
    }
    console.log('product', newItem)
    addNewItem(newItem)
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetail>
          <h1>{product.name}</h1>

          <span>{product.price}</span>
          <p>{product.description}</p>

          <button onClick={handleBuyProduct}>Comprar agora</button>
        </ProductDetail>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [
      { params: { id: 'prod_MfS8fe5f1VC7Jg' } },
      { params: { id: 'prod_MfS7oImAleN9k1' } },
      // { params: { id: 'prod_MfS7vhSgSvr9OD' } },
      // { params: { id: 'prod_MfS7vhSgSvr9OD' } },
    ],
    fallback: true,
    // fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  }
}
