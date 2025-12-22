'use client'

import { useColorModeValue } from '@/components/ui/color-mode'
import { Box, Center, Flex, Heading, Link } from '@chakra-ui/react'
import { default as RouterLink } from 'next/link'

export default function HomePage() {
  const headingColor = useColorModeValue("gray.700", "gray.300")
  return (
    <Box>
      <Flex
        align="center"
        direction="column"
        minHeight="md"
        pt={{ base: 12, md: 0 }}
      >
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="medium"
          lineHeight="3xl"
          mb={0}
          px={{ base: 10, sm: 0 }}
          textAlign="center"
        >
          A sweat equity company
        </Heading>
        <Heading
          as="h2"
          color={headingColor}
          fontSize="lg"
          fontWeight="medium"
          maxWidth="lg"
          my={3}
          mx="auto"
          textAlign="center"
          suppressHydrationWarning
        >
          We're a team of founders and startup veterans who love supporting early-stage entrepreneurs and their teams.
        </Heading>
        <Center>
          <Link
            as={RouterLink}
            href="/about"
            color="primary.500"
            fontSize="2xl"
            fontWeight="bold"
            mr={2}
            textDecoration="none"
            _hover={{ color: "primary.600", textDecoration: "none" }}
          >
            Learn more
          </Link>
          <Link
            as={RouterLink}
            href="/contact"
            color="primary.500"
            fontSize="2xl"
            fontWeight="bold"
            ml={2}
            textDecoration="none"
            _hover={{ color: "primary.600", textDecoration: "none" }}
          >
            Get in touch
          </Link>
        </Center>
      </Flex>
    </Box>
  )
}
