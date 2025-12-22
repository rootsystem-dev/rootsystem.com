'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/components/theme/system'
import { ColorModeProvider } from '@/components/utils/ColorModeContext'
import { useState, useEffect, useCallback } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState('light')

  const onColorModeChange = useCallback(({ matches }: { matches: boolean }) => {
    setColorMode(matches ? 'dark' : 'light')
  }, [])

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => prev === 'light' ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', onColorModeChange)
      onColorModeChange(mq as any)
      return () => {
        mq.removeEventListener('change', onColorModeChange)
      }
    }
  }, [onColorModeChange])

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider value={{ colorMode, toggleColorMode }}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
