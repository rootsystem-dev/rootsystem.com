
import { memo } from "react"
import { default as RouterLink } from "next/link"
import { useRouter } from "next/router"

// Components
import { Flex, IconButton, Link, Stack, Text, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
// import { InstagramIcon, TwitterIcon } from "../icons"

// const NavIcon = ({ children, href, ...rest }) => {
//   const { colorMode } = useColorMode()
//   return (
//     <Link 
//       color={colorMode === "dark" ? "gray.400" : "gray.500"}
//       display="flex"
//       href={href}
//       isExternal={true}
//       px={1}
//       py={2}
//       {...rest}
//     >
//       {children}
//     </Link>
//   )
// }

const NavLink = ({ children, href, ...rest }) => {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const isActive = router.pathname.indexOf(href) > -1
  return (
    <RouterLink href={href}>
      <Link
        bgClip={isActive && "text"}
        bgGradient={isActive && "linear(to-br, #FF0000, #BD00FF )"}
        color={colorMode === "dark" ? "gray.200" : "gray.600"}
        fontSize="sm"
        fontWeight={isActive ? "bold" : "normal"}
        lineHeight={6}
        px={1}
        py={2}
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
        <Link color={colorMode === "dark" ? "white" : "gray.800"}>
          <Text as="span" fontFamily="heading" fontSize="xl" fontWeight="bold" letterSpacing="tighter">
            Root System
          </Text>
        </Link>
      </RouterLink>

      <Stack align="center" isInline={true} justify="flex-end" spacing={4}>

        <NavLink href="/about">
          About
        </NavLink>

        <NavLink href="/team">
          Team
        </NavLink>

        <NavLink href="/apply">
          Apply
        </NavLink>

        <NavLink href="/contact">
          Contact
        </NavLink>

        {/* <Stack align="center" isInline={true} spacing={1}>

          <NavIcon
            href="https://twitter.com/foxinthewaves"
            title="Follow @foxinthewaves on Twitter"
          >
            <TwitterIcon />
          </NavIcon>

          <NavIcon
            href="https://instagram.com/foxinthewaves"
            title="Follow @foxinthewaves on Instagram"
          >
            <InstagramIcon />
          </NavIcon>

        </Stack> */}

        <IconButton 
          aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
          icon={
            colorMode === "dark" ? <MoonIcon /> : <SunIcon />
          } 
          onClick={toggleColorMode} 
        />
      </Stack>
    </Flex>
  )
})