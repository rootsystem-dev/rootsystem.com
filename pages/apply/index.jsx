import Head  from 'next/head'
import {
  Box,
  Button,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'

import { TypeformModal } from '@/components'

export default function ApplyPage ({ }) {
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pageName = 'Residency | Root System'
  const pageDesc = 'Apply to join the new cohort!'

  return (
    <>
      <Head>
        <title>{pageName}</title>
        <meta name="description" content={pageDesc} key="site-desc" />
        <meta property="og:title" content={pageName} key="og-title" />
        <meta property="og:description" content={pageDesc} key="og-desc" />
      </Head>
      <TypeformModal
        isOpen={isOpen}
        onClose={onClose}
        url="https://7qnnajeyz16.typeform.com/to/Jnvm4QF7"
      />
      <Box
        mx="auto"
        pt={{ base: 12, md: 40 }}
      >
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="medium"
          lineHeight="3xl"
          mb={10}
          px={{ base: 10, sm: 0 }}
          textAlign="center"
        >
          Join our Engineer in Residence program
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
              You like writing code, but have already figured out that you don't want to be an individual contributor <em>or</em> middle manager forever.
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
              We're a group of veteran engineering &amp; product leaders who have spent our careers building early stage startups.
            </ListItem>
            <ListItem>
              We're also a venture firm with a portfolio of early stage startups (twelve and counting!), some of whom are looking to hire someone like you.
            </ListItem>
            <ListItem>
              We're building a structured program for people like you to learn how to level-up and become true engineering leaders.
            </ListItem>
            <ListItem>
              The program doesn't cost money. In fact, we'll pay you to be in it.
            </ListItem>
          </UnorderedList>

          <Text fontSize="md" mb={8}>
            The Residency program will start in January, 2023 and run for three months.  The program will include components of apprenticeship, mentorship, and job placement.
          </Text>
          
          <Button mb={12} onClick={onOpen}>
            Apply to join the cohort
          </Button>
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
