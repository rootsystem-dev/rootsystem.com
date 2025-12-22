'use client'

import { default as RouterLink } from "next/link"
import { Container, Link, Text } from "@chakra-ui/react"

export default function NotFound() {
  return (
    <Container pb={[10, 40]}>
      <Text as="h1" mt={[10, 24]} textAlign="center">
        Page not found
      </Text>
      <Text textAlign="center">
        <Link as={RouterLink} href="/" color="pink.500">
          Let's go home
        </Link>
      </Text>
    </Container>
  )
}
