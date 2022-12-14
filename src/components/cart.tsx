import { ShoppingCartSimple, X } from 'phosphor-react'
import {
  Button,
  ButtonField,
  ButtonIconMinus,
  ButtonIconPlus,
  ButtonIconRemove,
  CardContainer,
  CardContainerInfo,
  CartContainer,
  CloseButton,
  Content,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  FinishButton,
  ImageContainer,
  Overlay,
  QuantInput,
  QuantityCart,
  Resume,
  ShoppingCartDiv,
  SpaceCards,
} from '../styles/pages/app'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/future/image'
import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useShoppingCart } from '../hooks/useShoppingCart'

const mockCard = [
  {
    name: 'Camiseta Beyond the Limits',
    price: '79,9',
    imageUrl:
      'https://files.stripe.com/links/MDB8YWNjdF8xTHc2MnFJRHo4TFFDbFZwfGZsX3Rlc3RfWFVFVTNxWERpcjNTOGM0Y3pvRFJLTnFD004CHfhA0v',
    id: 1,
    defaultPriceId: 3,
  },
  {
    name: 'Camiseta Explorer',
    price: '69,9',
    imageUrl:
      'https://files.stripe.com/links/MDB8YWNjdF8xTHc2MnFJRHo4TFFDbFZwfGZsX3Rlc3RfWFVFVTNxWERpcjNTOGM0Y3pvRFJLTnFD004CHfhA0v',
    id: 2,
    defaultPriceId: 3,
  },
  {
    name: 'Camiseta Ignite Lab | ReactJS',
    price: '74,1',
    imageUrl:
      'https://files.stripe.com/links/MDB8YWNjdF8xTHc2MnFJRHo4TFFDbFZwfGZsX3Rlc3RfWFVFVTNxWERpcjNTOGM0Y3pvRFJLTnFD004CHfhA0v',
    id: 3,
    defaultPriceId: 3,
  },
]

export function Cart() {
  const { items, removeItem, addItem, subItem, total, finishSessionShop } = useShoppingCart()
  const [quantity, setQuantity] = useState(0)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const [open, setOpen] = useState(false)

  function handleCloseDialog() {
    setOpen(false)
  }

  useEffect(() => {
    setQuantity(items.length)
  }, [items])

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)
    await finishSessionShop()
    setIsCreatingCheckoutSession(false)
  }

  function handleQuantityChange(e: ChangeEvent<HTMLInputElement>, amountItem: number, id: string) {
    const numberToChange = parseInt(e.target.value)
    if (numberToChange === 0) {
      removeItem(id)
    } else if (numberToChange > amountItem) {
      for (let i = amountItem; i < numberToChange; i++) {
        addItem(id)
      }
    } else if (numberToChange < amountItem) {
      for (let i = amountItem; i > numberToChange; i--) {
        subItem(id)
      }
    }
  }

  function SumQuantityProduct(id: string) {
    addItem(id)
  }

  function SubQuantityProduct(id: string) {
    subItem(id)
  }

  function handleRemoveItem(id: string) {
    removeItem(id)
  }
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CartContainer>
          <ShoppingCartDiv title="Carrinho">
            <ShoppingCartSimple size={24} color="#202024" weight="bold" />
          </ShoppingCartDiv>
          {quantity > 0 && (
            <QuantityCart>
              <span>{quantity}</span>
            </QuantityCart>
          )}
        </CartContainer>
      </DialogTrigger>
      <Dialog.Portal>
        <Overlay />

        <Content>
          <DialogTitle>Sacola de compras</DialogTitle>

          <CloseButton onClick={handleCloseDialog}>
            <X size={24} />
          </CloseButton>

          <SpaceCards>
            {items.map((card) => {
              return (
                <CardContainer key={card.id}>
                  <ImageContainer>
                    <Image src={card.imageUrl} width={95} height={95} alt="" />
                  </ImageContainer>
                  <CardContainerInfo>
                    <span>{card.name}</span>
                    <h2>{card.price}</h2>
                    <ButtonField>
                      <div>
                        <Button onClick={() => SumQuantityProduct(card.id)}>
                          <ButtonIconPlus size={16} color="#8047F8" weight="bold" />
                        </Button>
                        <QuantInput
                          placeholder="1"
                          id="QuantInput"
                          value={card.amount}
                          step={1}
                          min={1}
                          onChange={(e) => handleQuantityChange(e, card.amount, card.id)}
                        />
                        <Button onClick={() => SubQuantityProduct(card.id)}>
                          <ButtonIconMinus size={16} color="#8047F8" weight="bold" />
                        </Button>
                      </div>
                      <div>
                        <Button onClick={() => handleRemoveItem(card.id)}>
                          <ButtonIconRemove size={16} color="#8047F8" weight="bold" />
                          <h4>REMOVER</h4>
                        </Button>
                      </div>
                    </ButtonField>
                  </CardContainerInfo>
                </CardContainer>
              )
            })}
          </SpaceCards>

          {/* <Image src={product.imageUrl} width={520} height={480} alt="" /> */}

          <Resume>
            <div>
              <h3>Quantidade</h3>
              <h2>{quantity} itens</h2>
            </div>
            <div>
              <h2>Valor total</h2>
              <h1>R$ {total}</h1>
            </div>
          </Resume>

          <FinishButton disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
            Finalizar compra
          </FinishButton>
        </Content>
      </Dialog.Portal>
    </DialogRoot>
  )
}
