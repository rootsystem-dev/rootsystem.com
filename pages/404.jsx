import Head from "next/head"

/* Components */
import { Container, Link, Text } from "@chakra-ui/react"

export default function NotFound () {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <Container pb={[10, 40]}>
        <Text as="h1" mt={[10, 24]} textAlign="center">
          Page not found
        </Text>
        <Text textAlign="center">
          <Link href="/" color="pink.500">Let's go home</Link>
        </Text>
      </Container>
    </>
  )
}