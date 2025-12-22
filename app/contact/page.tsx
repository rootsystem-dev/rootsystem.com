'use client'

import type { Metadata } from 'next'
import { Widget } from '@typeform/embed-react'

import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'

import { useColorMode } from '@/components/ui/color-mode'

export default function ContactPage() {
  const { colorMode } = useColorMode()
  const viewport = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  return (
    <Box
      mx="auto"
      pt={{ base: 12, md: 0 }}
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
      <Box maxWidth="lg" mx="auto">
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
  )
}
