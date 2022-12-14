import axios from 'axios'
import { ChangeEvent, createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react'
import {
  addItemAction,
  addNewItemAction,
  removeItemAction,
  resetAllAction,
  subItemAction,
  sumItemAction,
} from '../reducers/Cart/actions'
import { cartReducer, ProductItem } from '../reducers/Cart/reducer'

interface ShoppingCartContextType {
  items: ProductItem[]
  total: number
  addNewItem: (item: ProductItem) => void
  removeItem: (id: string) => void
  addItem: (id: string) => void
  subItem: (id: string) => void
  finishSessionShop: () => void
  resetAll: () => void
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

export function ShoppingCartContextProvider({ children }: ShoppingCartProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      items: [],
    },
    () => {
      if (typeof window !== 'undefined') {
        const storedStateAsJSON = localStorage.getItem('@shop-ignite:cart-State-1.0.0')

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
      }
      return { items: [] }
    },
  )

  const { items } = cartState

  const total = items.reduce((totalPrice, item) => {
    // console.log('totalPrice', (item.amount * Number(item.price.replace(/[^0-9.-]+/g, ''))) / 100)
    // console.log(
    //   'return ',
    //   Number.parseFloat(totalPrice + (item.amount * Number(item.price.replace(/[^0-9.-]+/g, ''))) / 100).toFixed(2),
    // )
    // console.log('totalPrice Item:', totalPrice + (item.amount * Number(item.price.replace(/[^0-9.-]+/g, ''))) / 100)
    return totalPrice + (item.amount * Number(item.price.replace(/[^0-9.-]+/g, ''))) / 100
  }, 0)

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    localStorage.setItem('@shop-ignite:cart-State-1.0.0', stateJSON)
  }, [cartState])

  function addNewItem(item: ProductItem) {
    const tryFindItemOnCart = items.find((i) => i.id === item.id)
    if (tryFindItemOnCart) {
      dispatch(sumItemAction(item.id, item.amount))
    } else {
      dispatch(addNewItemAction(item))
    }
  }

  function removeItem(id: string) {
    dispatch(removeItemAction(id))
  }

  function resetAll() {
    dispatch(resetAllAction())
  }

  function addItem(id: string) {
    dispatch(addItemAction(id))
  }

  function subItem(id: string) {
    dispatch(subItemAction(id))
  }

  async function finishSessionShop() {
    try {
      const pricesId = items.map((item) => {
        return {
          price: item.defaultPriceId,
          quantity: item.amount,
        }
      })
      const response = await axios.post('/api/checkout', {
        pricesId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
      resetAll()
    } catch (erro) {
      console.log('error', erro)
      alert(erro)
    }
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        items,
        total,
        addNewItem,
        removeItem,
        addItem,
        subItem,
        finishSessionShop,
        resetAll,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)

  return context
}
