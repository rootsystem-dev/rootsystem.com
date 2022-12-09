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
  const pageName = 'Apply | Root System'
  const pageDesc = 'Apply to work at Root System!'

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
          Join our Team!
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
              You're a software engineer, product manager, or growth hacker.
            </ListItem>
            <ListItem>
              You're interested in working fractionally, for early-stage an early stage company or two, and earning diversified equity in companies across our portfolio.
            </ListItem>
            <ListItem>
              Perhaps you're a freelancer, and you're willing to take a lower cash rate (or even forgo cash entirely) to get more equity.
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
              We're also a venture firm with a portfolio of early stage startups, some of whom are looking to hire someone like you.
            </ListItem>
            <ListItem>
              We're hiring!  Just send a cover letter and some combination of a résumé, a portfolio, and your Github & LinkedIn URLs to apply@rootsystem.com :)
            </ListItem>
          </UnorderedList>

        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
