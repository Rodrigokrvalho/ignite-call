import { globalCss } from '@ignite-ui/react'
import { Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  subsets: ['latin-ext', 'latin'],
})

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})
