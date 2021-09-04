import { Box, Center, Heading, useColorMode } from '@chakra-ui/react'

export default function HomePage ({ }) {
  const { colorMode } = useColorMode()
  return (
    <Box>
      <Center
        bgColor={colorMode === "dark" ? "gray.800" : "gray.50"}
        flexDirection="column"
        minHeight="md"
      >
        <Heading as="h1" fontWeight="medium" mb={0} size="3xl">
          A different kind of consulting firm
        </Heading>
        <Heading as="h2" fontWeight="medium" size="md">
          This is a sub-heading
        </Heading>
      </Center>
    </Box>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
