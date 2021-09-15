import { default as RouterLink } from 'next/link'
import Head  from 'next/head'

import { Box, Heading, Link, Text } from '@chakra-ui/react'

export default function AboutPage ({ }) {
  const pageName = 'About Us | Root System'
  const pageDesc = 'We\'re a team of founders and startup veterans who love supporting early-stage founders and their teams.'
  return (
    <>
      <Head>
        <title>{pageName}</title>
        <meta name="description" content={pageDesc} key="site-desc" />
        <meta property="og:title" content={pageName} key="og-title" />
        <meta property="og:description" content={pageDesc} key="og-desc" />
      </Head>
      <Box
        mx="auto"
        pt={{ base: 12, md: 40 }}
      >
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="medium"
          lineHeight={10}
          mb={10}
          textAlign="center"
        >
          A new kind of venture firm
        </Heading>
        <Box lineHeight={7} maxWidth="lg" mx="auto">
          <Text mb={4}>
            We are a group of veteran founders, CTOs, developers, and product designers, and we work at steeply discounted rates in exchange for stock in the companies we serve. This means we are incentivized to do a <em>very</em> good job.
          </Text>
          <Text mb={4}>
            We help startup founders de-risk their products and technology by designing &amp; building high-quality software and high-functioning engineering organizations. We also help those founders raise capital and recruit full-time staff to replace us before we move on.
          </Text>
          <Text mb={4}>
            You can think of Root System as a seed stage venture firm, but one that invests sweat and brainpower and code (which are highly differentiated) instead of investing cash (which is not); or if you prefer, think of us as an accelerator for your product itself.
          </Text>
          <Text mb={12}>
            <RouterLink href="/contact">
              <Link
                fontSize="md"
                fontWeight="bold"
                lineHeight={5}
              >
                Get in touch
              </Link>
            </RouterLink>
          </Text>
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
