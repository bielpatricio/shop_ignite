import { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import { ShoppingCartSimple, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../assets/logo.svg'
import {
  Container,
  Header,
  CartContainer,
  ShoppingCartDiv,
  QuantityCart,
  Overlay,
  CloseButton,
  Content,
  DialogRoot,
  DialogTrigger,
  DialogTitle,
  FinishButton,
  Resume,
  SpaceCards,
  CardContainer,
  ImageContainer,
  Button,
  ButtonIconMinus,
  ButtonIconRemove,
  ButtonIconPlus,
  ButtonField,
  QuantInput,
  CardContainerInfo,
} from '../styles/pages/app'

import Image from 'next/future/image'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import {
  ShoppingCartContextProvider,
  useShoppingCart,
} from '../hooks/useShoppingCart'
import { Cart } from '../components/cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false)

  function handleCloseDialog() {
    setOpen(false)
  }

  return (
    <Container>
      <ShoppingCartContextProvider>
        <Header>
          <Link href={`/`} prefetch={false}>
            <Image src={logoImg.src} width={100} height={100} alt="" />
          </Link>
          <DialogRoot open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <Cart handleCloseDialog={handleCloseDialog} />
          </DialogRoot>
        </Header>
        <Component {...pageProps} />
      </ShoppingCartContextProvider>
    </Container>
  )
}
