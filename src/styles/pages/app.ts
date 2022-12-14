import { styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'
import { Minus, Plus, Trash } from 'phosphor-react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const CartContainer = styled('div', {
  display: 'flex',
})

export const ImageContainer = styled('div', {
  width: '100%',
  height: 95,
  maxWidth: 95,
  background: 'linear-gradient(180deg, #4f46e5 0%, #6b21a8 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ShoppingCartDiv = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem 0.5rem',
  backgroundColor: '$indigo500',
  borderRadius: 8,
  border: 'none',

  '&:hover': {
    cursor: 'pointer',
  },
})

export const QuantityCart = styled('div', {
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '$purple500',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '-0.75rem',
  marginTop: '-0.75rem',
  span: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 12,
    color: '$gray800',
  },
})

export const DialogRoot = styled(Dialog.Root, {
  backgroundColor: 'transparent',
})

export const DialogTrigger = styled(Dialog.Trigger, {
  backgroundColor: 'transparent',
  border: 'none',
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  // inset: 0, // top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'transparent',
})

export const Content = styled(Dialog.Content, {
  // minWidth: '32rem',
  width: '30rem',
  height: '100vh',
  borderRadius: 6,
  padding: '4rem 3rem',
  background: '$gray800',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  position: 'fixed',
  top: '50%',
  left: 'calc(100% - 15rem)',
  // right: '0',
  transform: 'translate(-50%, -50%)',
})

export const FinishButton = styled('button', {
  background: 'linear-gradient(268.7deg, rgba(79, 70, 229, 0.5) 0%, #8257E6 100%, rgba(107, 33, 168, 0.5) 100%)',
  // backgroundColor: '$green500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  cursor: 'pointer',
  padding: '1.25rem',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },

  '&:not(:disabled):hover': {
    background: 'linear-gradient(268.7deg, #4F46E5 0%, #8257E6 100%, #6B21A8 100%)',
    // backgroundColor: '$green300',
  },
})

export const Resume = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  fontFamily: 'Roboto',
  fontWeight: 700,
  color: '$gray100',
  padding: '1rem 0',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  h3: {
    fontSize: '16px',
  },

  h2: {
    fontSize: '$md',
  },

  h1: {
    fontSize: '24px',
  },
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0, // font-size: 0,
  cursor: 'pointer',
  color: '$gray300',
})

export const DialogTitle = styled(Dialog.Title, {
  fontFamily: 'Roboto',
  fontWeight: '700',
  fontSize: '20px',
  color: '$gray300',
})

export const CardContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

export const CardContainerInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '0.5rem',
  width: '100%',
  h2: {
    fontSize: '$md',
    color: '$gray100',
    fontWeight: 700,
  },

  span: {
    fontSize: '$md',
    color: '$gray300',
    fontWeight: 400,
  },
})

export const Button = styled('button', {
  fontSize: '16px',
  color: '$indigo500',
  fontWeight: 700,
  background: 'transparent',
  border: 0,
  display: 'flex',
  alignItems: 'flex-start',

  '&:focus': {
    boxShadow: 'none',
    outline: 'transparent',
  },

  '&:hover': {
    cursor: 'pointer',
  },
})

export const ButtonField = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2rem',
    borderRadius: '8px',
  },
})

export const SpaceCards = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '3rem 0',
})

export const QuantInput = styled('input', {
  background: 'transparent',
  height: '2rem',
  border: 0,
  borderBottom: '2px solid $gray300',
  fontWeight: 'bold',
  fontSize: '$md',
  color: '$indigo500',
  textAlign: 'center',
  justifyContent: 'center',

  '&:focus': {
    boxShadow: 'none',
    borderColor: '$purple800',
  },

  '&::placeholder': {
    color: '$gray900',
  },

  width: '1.5rem',
})

export const ButtonIconMinus = styled(Minus, {
  backgroundColor: 'transparent',
})

export const ButtonIconPlus = styled(Plus, {
  backgroundColor: 'transparent',
})

export const ButtonIconRemove = styled(Trash, {
  backgroundColor: 'transparent',
})
