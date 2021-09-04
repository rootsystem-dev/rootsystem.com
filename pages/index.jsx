import { default as RouterLink } from 'next/link'
import { Box, Center, Heading, Link, useColorMode } from '@chakra-ui/react'

export default function HomePage ({ }) {
  const { colorMode } = useColorMode()
  return (
    <Box>
      <Center
        // bgColor={colorMode === "dark" ? "gray.800" : "gray.50"}
        flexDirection="column"
        minHeight="md"
      >
        <Heading as="h1" fontWeight="medium" mb={1} size="3xl" textAlign="center">
          A new kind of venture firm
        </Heading>
        <Heading as="h2" color="gray.700" fontSize="lg" fontWeight="medium" lineHeight={7} maxWidth="lg" my={5} textAlign="center">
          We're a team of founders and startup veterans who love supporting early-stage founders and their teams.
        </Heading>
        <Center>
          <RouterLink href="/about">
            <Link
              fontSize="md"
              fontWeight="bold"
              lineHeight={5}
              mr={2}
            >
              Learn more
            </Link>
          </RouterLink>
          <RouterLink href="/contact">
            <Link
              fontSize="md"
              fontWeight="bold"
              lineHeight={5}
              ml={2}
            >
              Get in touch
            </Link>
          </RouterLink>
        </Center>
      </Center>
    </Box>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
