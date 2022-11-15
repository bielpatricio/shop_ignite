import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
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
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      items: [],
    },
    () => {
      if (typeof window !== 'undefined') {
        const storedStateAsJSON = localStorage.getItem(
          '@shop-ignite:cart-State-1.0.0',
        )

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
      }
      return { items: [] }
    },
  )

  const { items } = cartState

  const total = items.reduce((totalPrice, item) => {
    // console.log('totalPrice', totalPrice)
    // console.log('totalPrice Item:', item)
    return totalPrice + item.amount * item.price
  }, 0)

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    localStorage.setItem('@shop-ignite:cart-State-1.0.0', stateJSON)
  }, [cartState])

  console.log('itemsss  ', items)

  function addNewItem(item: ProductItem) {
    const tryFindItemOnCart = items.find((i) => i.id === item.id)
    if (tryFindItemOnCart) {
      dispatch(sumItemAction(item.id, item.amount))
      console.log(
        `${item.amount} qunatidades adicionado no item ${item.name} -> ${item}`,
      )
    } else {
      dispatch(addNewItemAction(item))
      console.log('item adicionado no carrinho: ', item)
    }
    // setTotal((state) => state + item.amount * item.price)
  }

  function removeItem(id: string) {
    // const item = items.find((coff) => coff.id === id)
    // setTotal((state) => state - item.amount * item.price)
    dispatch(removeItemAction(id))
    // console.log('item removido do carrinho: ', id)
  }

  function resetAll() {
    dispatch(resetAllAction())
  }

  function addItem(id: string) {
    // const item = items.find((coff) => coff.id === id)
    // setTotal((state) => state + item.price)
    dispatch(addItemAction(id))
  }

  function subItem(id: string) {
    // const item = items.find((coff) => coff.id === id)
    // setTotal((state) => state - item.price)
    dispatch(subItemAction(id))
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
