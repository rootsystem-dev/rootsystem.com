
import { memo, useEffect } from 'react'
import { useRouter } from 'next/router'

// Components
import {
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  useBreakpointValue,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Logomark } from '@/components/elements'

const routes = [
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/apply' },
  { label: 'Contact', path: '/contact' },
]

const DesktopNav = memo(({ colorMode }) => {
  const router = useRouter()
  return (
    <>
      {routes.map((route, index) => (
        <Link
          href={route.path}
          key={index}
          color={colorMode === "dark" ? "gray.200" : "gray.600"}
          fontSize="sm"
          fontWeight={
            router.pathname.indexOf(route.path) > -1 ? "bold" : "normal"
          }
          lineHeight={6}
          py={2}
          textTransform="uppercase"
        >
          {route.label}
        </Link>
      ))}
    </>
  )
})

const MobileNav = memo(({ colorMode }) => {
  const router = useRouter()
  return (
    <Flex
      align="center"
      bgColor={colorMode === 'dark' ? 'gray.900' : 'white'}
      bottom={0}
      direction="column"
      height="100vh"
      justify="center"
      left={0}
      p={10}
      position="absolute"
      right={0}
      top={0}
      zIndex={1}
    >
      {routes.map((route, index) => (
        <Link
          href={route.path}
          key={index}
          color={
            colorMode === "dark" ? "gray.200" : "gray.700"
          }
          display="block"
          fontFamily="heading"
          fontSize="2xl"
          fontWeight={
            router.pathname.indexOf(route.path) > -1 ? "bold" : "normal"
          }
          lineHeight={8}
          py={4}
          textTransform="uppercase"
        >
          {route.label}
        </Link>
      ))}      
    </Flex>
  )
})

export const Header = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const router = useRouter()
  const viewport = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [router.asPath])

  return (
    <>
      {viewport === 'mobile' && isOpen && (
        <MobileNav colorMode={colorMode} />
      )}

      <Flex
        align="center"
        as="header"
        justify="space-between"
        py={[ 3, 7 ]}
        zIndex={2}
      >
        <Link
          href="/"
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

        <Stack
          align="center"
          isInline={true}
          justify="flex-end"
          spacing={
            viewport === 'mobile' ? 2 : 6 
          }
        >
          {viewport === 'desktop' && (
            <DesktopNav colorMode={colorMode} />
          )}

          <IconButton 
            aria-label={
              `Switch to ${colorMode === "dark" ? "light" : "dark"} mode`
            }
            icon={
              colorMode === "dark" ? <MoonIcon /> : <SunIcon />
            }
            onClick={toggleColorMode}
            variant="ghost"
            _focus={{ outline: 0 }}
          />

          {viewport === 'mobile' && (
            <IconButton
              aria-label={``}
              icon={
                <HamburgerIcon />
              }
              onClick={onToggle}
              variant="ghost"
              _focus={{ outline: 0 }}
            />
          )}
        </Stack>
      </Flex>
    </>
  )
})
