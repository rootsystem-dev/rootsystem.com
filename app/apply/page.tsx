'use client'

import Head from 'next/head'
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { TypeformModal } from '@/components'
import { useColorModeValue } from '@/components/ui/color-mode'

export default function ApplyPage() {
  const headingColor = useColorModeValue("gray.700", "gray.300")
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <>
      <TypeformModal
        isOpen={open}
        onClose={onClose}
        url="https://7qnnajeyz16.typeform.com/to/Jnvm4QF7"
      />
      <Box
        mx="auto"
        pt={{ base: 12, md: 0 }}
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
          Join our team!
        </Heading>
        <Box maxWidth="lg" mx="auto">
          <Heading
            as="h2"
            color={headingColor}
            fontSize="lg"
            fontWeight="medium"
            maxWidth="lg"
            my={5}
            mx="auto"
            suppressHydrationWarning
          >
            About you:
          </Heading>
          <ul style={{ fontSize: '0.9375rem', marginBottom: '1.5rem', paddingLeft: '0.5rem', listStylePosition: 'inside' }}>
            <li>
              You're a software engineer, product manager, or growth hacker.
            </li>
            <li>
              You're interested in working fractionally, for an early-stage company – or two!
            </li>
            <li>
              You are curious about earning diversified equity in companies across our portfolio – not just the one you're working on.
            </li>
            <li>
              Perhaps you're a freelancer, and you're willing to take a lower cash rate (or even forgo cash entirely) to get more equity.
            </li>
          </ul>

          <Heading
            as="h2"
            color={headingColor}
            fontSize="lg"
            fontWeight="medium"
            maxWidth="lg"
            my={5}
            mx="auto"
            suppressHydrationWarning
          >
            About us:
          </Heading>
          <ul style={{ fontSize: '0.9375rem', marginBottom: '1.5rem', paddingLeft: '0.5rem', listStylePosition: 'inside' }}>
            <li>
              We're a group of veteran engineering &amp; product leaders who have spent our careers building early stage startups.
            </li>
            <li>
              We're also a venture firm with a portfolio of early stage startups, some of whom are looking to hire someone like you.
            </li>
            <li>
              We're hiring!  &#128516;
            </li>
            <li>
              Just send a cover letter and some combination of a résumé, a portfolio, and links to your GitHub/LinkedIn to:  <strong>apply@rootsystem.com</strong>
            </li>
          </ul>

        </Box>
      </Box>
    </>
  )
}
