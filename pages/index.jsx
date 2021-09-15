import { default as RouterLink } from 'next/link'
import { Box, Center, Flex, Heading, Link, useColorMode } from '@chakra-ui/react'

export default function HomePage ({ }) {
  const { colorMode } = useColorMode()
  return (
    <Box>
      <Flex
        align="center"
        direction="column"
        minHeight="md"
        pt={{ base: 12, md: 40 }}
      >
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="medium"
          lineHeight="3xl"
          mb={1}
          px={{ base: 10, sm: 0 }}
          textAlign="center"
        >
          A new kind of venture firm
        </Heading>
        <Heading
          as="h2"
          color={colorMode === "dark" ? "gray.300" : "gray.700"}
          fontSize="lg"
          fontWeight="medium"
          lineHeight={7}
          maxWidth="lg"
          my={5}
          mx="auto"
          textAlign="center"
        >
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
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
