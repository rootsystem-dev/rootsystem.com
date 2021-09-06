import {
  Box,
  Button,
  Heading,
  Link,
  // List,
  // ListIcon,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'

import { TypeformModal } from 'components'

export default function ApplyPage ({ }) {
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <TypeformModal
        isOpen={isOpen}
        onClose={onClose}
        url="https://7qnnajeyz16.typeform.com/to/Jnvm4QF7"
      />
      <Box
        mx="auto"
        pt={{ base: 12, md: 40 }}
      >
        <Heading as="h1" fontWeight="medium" mb={10} size="3xl" textAlign="center">
          A new kind of fellowship
        </Heading>
        <Box lineHeight={7} maxWidth="lg" mx="auto">
          <Heading
            as="h2"
            color={colorMode === "dark" ? "gray.300" : "gray.700"}
            fontSize="lg"
            fontWeight="medium"
            lineHeight={7}
            maxWidth="lg"
            my={5}
            mx="auto"
          >
            About you:
          </Heading>
          <UnorderedList fontSize="md" mb={6} pl={2}>
            <ListItem>
              You're a software engineer, 5+ years into your career.
            </ListItem>
            <ListItem>
              You like writing code, but have already figured out that you don't want to be a career individual contributor or middle manager.
            </ListItem>
            <ListItem>
              You see people at startups with roles like CTO, VP Engineering, or Chief Architect. You can see yourself in that sort of role one day, but you feel unclear on how to get there.
            </ListItem>
          </UnorderedList>

          <Heading
            as="h2"
            color={colorMode === "dark" ? "gray.300" : "gray.700"}
            fontSize="lg"
            fontWeight="medium"
            lineHeight={7}
            maxWidth="lg"
            my={5}
            mx="auto"
          >
            About us:
          </Heading>
          <UnorderedList fontSize="md" mb={6} pl={2}>
            <ListItem>
              We're a group of veteran engineering &amp; product leaders who's spent our careers in early stage startups (years 0-5).
            </ListItem>
            <ListItem>
              We're building a structured program for people like you.
            </ListItem>
            <ListItem>
              The program doesn't cost money. In fact, we'll pay you to be in it.
            </ListItem>
          </UnorderedList>

          <Text fontSize="md" mb={8}>
            The program will run October 1st, 2021, through April 1st, 2022, and will include components of apprenticeship, mentorship, and job placement.
          </Text>
          
          <Button mb={12} onClick={onOpen}>
            Apply to join the first cohort
          </Button>
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
