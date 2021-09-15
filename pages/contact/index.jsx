import Head  from 'next/head'
import { Widget } from '@typeform/embed-react'

import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useColorMode
} from '@chakra-ui/react'

export default function ContactPage ({ }) {
  const { colorMode } = useColorMode()
  const pageName = 'Contact Us | Root System'
  const pageDesc = 'Questions, feedback, or just saying hello? Let\'s chat.'
  const viewport = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  return (
    <>
      <Head>
        <title>{pageName}</title>
        <meta name="description" content={pageDesc} key="site-desc" />
        <meta property="og:title" content={pageName} key="og-title" />
        <meta property="og:description" content={pageDesc} key="og-desc" />
      </Head>
      <Box
        mx="auto"
        pt={{ base: 12, md: 40 }}
      >
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="medium"
          lineHeight="3xl"
          mb={10}
          px={{ base: 10, sm: 0 }}
          size="3xl"
          textAlign="center"
        >
          Contact
        </Heading>
        <Box lineHeight={7} maxWidth="lg" mx="auto">
          <Widget 
            hideFooter={true}
            hideHeaders={true}
            id="l35rkhJK"
            source="rootsystem.com"
            style={{ 
              height: viewport === 'mobile' ? 400 : 600,
              width: '100%'
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
