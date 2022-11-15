import { spawn } from 'child_process'
import { styled } from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',
  maxWidth: 1180,
  margin: '0 auto',
})

export const ImageContainer = styled('div', {
  width: '100%',
  height: 656,
  maxWidth: 576,
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

export const ProductDetail = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'flex',
    fontSize: '$2xl',
    color: '$indigo500',
    marginBottom: '2rem',
  },

  p: {
    marginTop: '0.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    background:
      'linear-gradient(268.7deg, rgba(79, 70, 229, 0.5) 0%, #8257E6 100%, rgba(107, 33, 168, 0.5) 100%)',
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
      background:
        'linear-gradient(268.7deg, #4F46E5 0%, #8257E6 100%, #6B21A8 100%)',
      // backgroundColor: '$green300',
    },
  },
})
