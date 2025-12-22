import { memo, useCallback, useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Head  from 'next/head'
import { useRouter } from 'next/router'

/* Components */
import { Box, Flex } from '@chakra-ui/react'
import { Container, Footer, Header } from '@/components/elements'
import { system } from '@/components/theme/system'
import { ColorModeProvider } from '@/components/utils/ColorModeContext'

/* Images */
import SocialCard from '../public/images/rootsystem-card.png'

const AppContainer = memo(({ children }) => {
  const [colorMode, setColorMode] = useState('light')

  const onColorModeChange = useCallback(({ matches }) => {
    setColorMode(matches ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', onColorModeChange)
      onColorModeChange(mq)
    }
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onColorModeChange)
    }
  }, [])

  return (
    <>
      <Head>
        <link href={`/images/favicon/${colorMode}/apple-touch-icon.png`} rel="apple-touch-icon" sizes="180x180" />
        <link href={`/images/favicon/${colorMode}/favicon.ico`} rel="icon" />
        <link rel="icon" href={`/images/favicon/${colorMode}/favicon-32x32.png`} rel="icon" sizes="32x32" type="image/png" />
        <link rel="icon" href={`/images/favicon/${colorMode}/favicon-16x16.png`} rel="icon" sizes="16x16" type="image/png" />
      </Head>
      <ColorModeProvider value={{ colorMode }}>
        <Container>
          {children}
        </Container>
      </ColorModeProvider>
    </>
  )
})

export default function App ({ Component, pageProps }) {
  let router
  try {
    router = useRouter()
  } catch (e) {
    // Router not available during SSR
  }
  const siteName = 'Root System'
  const siteDesc = 'We help startup founders de-risk their product/technology by designing & building high-quality software and high-functioning engineering organizations.'
  const ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}${SocialCard.src}`
  const ogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pageProps.currentPath || router?.asPath || ''}`

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={siteDesc} key="site-desc" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={siteName} key="og-title" />
        <meta property="og:description" content={siteDesc} key="og-desc" />
        <meta property="og:url" content={ogUrl} key="og-url" />
        <meta property="og:image" content={ogImage} key="og-image" />
        <meta property="og:site_name" content={siteName} key="og-sitename" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <ChakraProvider value={system}>
        <AppContainer>
          <Flex direction="column" minHeight="100vh">
            <Header currentPath={pageProps.currentPath || router?.pathname || ''} />
            <Box flex={1}>
              <Component {...pageProps} />
            </Box>
            <Footer />
          </Flex>
        </AppContainer>
      </ChakraProvider>
    </>
  )
}