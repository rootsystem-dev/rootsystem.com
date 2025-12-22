'use client'

import { createContext, useContext } from 'react'

const ColorModeContext = createContext({
  colorMode: 'light',
  toggleColorMode: () => {}
})

export const ColorModeProvider = ColorModeContext.Provider

export const useColorMode = () => {
  try {
    const context = useContext(ColorModeContext)
    return context || { colorMode: 'light', toggleColorMode: () => {} }
  } catch (error) {
    return { colorMode: 'light', toggleColorMode: () => {} }
  }
}
