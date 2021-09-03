import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'

export default function HomePage ({ }) {
  return (
    <Box>
      <Center flexDirection="column" bgColor="gray.800" minHeight="md">
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
