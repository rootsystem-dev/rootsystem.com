import { memo, useCallback, useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import Head  from 'next/head'

/* Components */
import { Box, Flex } from '@chakra-ui/react'
import { Container, Footer, Header } from 'components/elements'
import { global, theme } from 'components/theme'

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
      <Global styles={global} />
      <Container>
        {children}
      </Container>
    </>
  )
})

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Root System</title>
        <meta name="Description" content="We help startup founders de-risk their product/technology by designing & building high-quality software and high-functioning engineering organizations." />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;900&family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <AppContainer>
          <Flex direction="column" minHeight="100vh">
            <Header />
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