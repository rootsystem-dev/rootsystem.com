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
          lineHeight="3xl"
          mb={10}
          px={{ base: 10, sm: 0 }}
          textAlign="center"
        >
          A new kind of venture firm.
        </Heading>
        <Box lineHeight={7} maxWidth="lg" mx="auto">
          <Text mb={4}>
            Root System is a collective of veteran startup founders, growth hackers, CTOs, developers, and product leaders. We do consulting for early-stage startups, and we work at steeply discounted rates in exchange for stock in the companies we serve.  This "skin in the game" means we are incentivized to do a <em>very</em> good job.
          </Text>
          <Text mb={4}>
            We help startup founders de-risk their products and technology by designing &amp; building high-quality software and high-functioning engineering organizations. We also help those founders develop markets, raise capital, and recruit + mentor full-time staff.
          </Text>
          <Text mb={4}>
            You can think of Root System as a seed stage venture firm, but one that invests sweat and brainpower and code (which are highly differentiated) instead of investing cash (although we do that too);  or if you prefer, think of us as an accelerator for your product itself.
          </Text>
          <Text mb={12}>
            <Link
              href="/contact"
              fontSize="md"
              fontWeight="bold"
              lineHeight={5}
            >
              Get in touch
            </Link> or just email us, partners@rootsystem.com
          </Text>
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
