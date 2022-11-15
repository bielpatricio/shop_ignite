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
  DialogTitle,
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

interface CartProps {
  handleCloseDialog: () => void
}

export function Cart({ handleCloseDialog }: CartProps) {
  const { items } = useShoppingCart()
  const [quantity, setQuantity] = useState(0)
  // const amount = items ? items.length : 0
  console.log('items App', quantity)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  useEffect(() => {
    setQuantity(items.length)
  }, [items])

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        // priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (erro) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar a pagina')
    }
  }

  function handleQuantityChange(e: ChangeEvent<HTMLInputElement>) {
    // setQuantity(parseInt(e.target.value))
  }

  function SumQuantityProduct() {
    // setQuantity((state) => state + 1)
    // addItem(id)
  }

  function SubQuantityProduct() {
    // if (quantity > 1) {
    //   subItem(id)
    //   setQuantity((state) => {
    //     return state - 1
    //   })
    // } else {
    //   removeItem(id)
    //   setQuantity(0)
    // }
  }

  function handleRemoveItem() {
    // removeItem(id)
  }
  return (
    <CartContainer>
      <ShoppingCartDiv title="Carrinho">
        <ShoppingCartSimple size={24} color="#202024" weight="bold" />
      </ShoppingCartDiv>
      {quantity > 0 && (
        <QuantityCart>
          <span>{quantity}</span>
        </QuantityCart>
      )}

      <Dialog.Portal>
        <Overlay />

        <Content>
          <DialogTitle>Sacola de compras</DialogTitle>

          <CloseButton onClick={handleCloseDialog}>
            <X size={24} />
          </CloseButton>

          <SpaceCards>
            {mockCard.map((card) => {
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
                        <Button onClick={SumQuantityProduct}>
                          <ButtonIconPlus
                            size={16}
                            color="#8047F8"
                            weight="bold"
                          />
                        </Button>
                        <QuantInput
                          placeholder="1"
                          id="QuantInput"
                          // value={quantity}
                          onChange={handleQuantityChange}
                        />
                        <Button onClick={SubQuantityProduct}>
                          <ButtonIconMinus
                            size={16}
                            color="#8047F8"
                            weight="bold"
                          />
                        </Button>
                      </div>
                      <div>
                        <Button onClick={handleRemoveItem}>
                          <ButtonIconRemove
                            size={16}
                            color="#8047F8"
                            weight="bold"
                          />
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
              <h2>3 itens</h2>
            </div>
            <div>
              <h2>Valor total</h2>
              <h1>R$ 270,00</h1>
            </div>
          </Resume>

          <FinishButton
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Finalizar compra
          </FinishButton>
        </Content>
      </Dialog.Portal>
    </CartContainer>
  )
}
