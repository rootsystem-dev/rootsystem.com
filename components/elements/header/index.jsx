
import { memo } from 'react'
import { default as RouterLink } from 'next/link'
import { useRouter } from 'next/router'

// Components
import { Flex, Heading, IconButton, Link, Stack, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Logomark } from 'components/elements'

const NavLink = ({ children, href, ...rest }) => {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const isActive = router.pathname.indexOf(href) > -1
  return (
    <RouterLink href={href}>
      <Link
        color={colorMode === "dark" ? "gray.200" : "gray.600"}
        fontSize="sm"
        fontWeight={isActive ? "bold" : "normal"}
        lineHeight={6}
        py={2}
        textTransform="uppercase"
        {...rest}
      >
        {children}
      </Link>
    </RouterLink>
  )
}

export const Header = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex align="center" as="header" justify="space-between" py={[ 3, 7 ]}>
      <RouterLink href="/">
        <Link
          color={colorMode === "dark" ? "white" : "gray.800"}
          display="flex"
          alignItems="center"
        >
          <Logomark boxSize={16} />
          <Heading
            as="span"
            letterSpacing="tighter"
            size="lg"
          >
            Root System
          </Heading>
        </Link>
      </RouterLink>

      <Stack align="center" isInline={true} justify="flex-end" spacing={6}>

        <NavLink href="/about">
          About
        </NavLink>

        <NavLink href="/apply">
          Fellowship
        </NavLink>

        <NavLink href="/contact">
          Contact
        </NavLink>

        <IconButton 
          aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
          icon={
            colorMode === "dark" ? <MoonIcon /> : <SunIcon />
          }
          onClick={toggleColorMode}
          variant="ghost"
          _focus={{ outline: 0 }}
        />
      </Stack>
    </Flex>
  )
})