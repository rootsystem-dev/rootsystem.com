import { Widget } from '@typeform/embed-react'

import {
  Box,
  Button,
  Heading,
  Text,
  useColorMode
} from '@chakra-ui/react'

export default function ContactPage ({ }) {
  const { colorMode } = useColorMode()
  return (
    <>
      <Box
        mx="auto"
        pt={{ base: 12, md: 40 }}
      >
        <Heading as="h1" fontWeight="medium" mb={10} size="3xl" textAlign="center">
          Contact
        </Heading>
        <Box lineHeight={7} maxWidth="lg" mx="auto">
          <Widget 
            hideFooter={true}
            hideHeaders={true}
            id="l35rkhJK"
            source="rootsystem.com"
            style={{ height: 600, width: '100%' }}
          />
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
