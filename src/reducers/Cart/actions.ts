import { ProductItem } from './reducer'

export enum ActionTypes {
  ADD_NEW_ITEM = 'ADD_NEW_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SUB_ITEM = 'SUB_ITEM',
  ADD_ITEM = 'ADD_ITEM',
  SUM_ITEM = 'SUM_ITEM',
  RESET_ALL = 'RESET_ALL',
}

export function resetAllAction() {
  return {
    type: ActionTypes.RESET_ALL,
  }
}
export function addItemAction(id: string) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      id,
    },
  }
}
export function sumItemAction(id: string, quantity: number) {
  return {
    type: ActionTypes.SUM_ITEM,
    payload: {
      id,
      quantity,
    },
  }
}
export function addNewItemAction(item: ProductItem) {
  return {
    type: ActionTypes.ADD_NEW_ITEM,
    payload: {
      item,
    },
  }
}
export function removeItemAction(id: string) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      id,
    },
  }
}
export function subItemAction(id: string) {
  return {
    type: ActionTypes.SUB_ITEM,
    payload: {
      id,
    },
  }
}
