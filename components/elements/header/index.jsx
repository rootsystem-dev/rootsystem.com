"use client";

import { default as RouterLink } from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

// Components
import { Logomark } from "@/components/elements";
import {
    ColorModeIcon,
    useColorMode,
    useColorModeValue,
} from "@/components/ui/color-mode";
import {
    ClientOnly,
    Flex,
    Heading,
    IconButton,
    Link,
    Stack,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";

const routes = [
  { label: "About", path: "/about" },
  { label: "Careers", path: "/apply" },
  { label: "Contact", path: "/contact" },
];

const DesktopNav = memo(({ colorMode }) => {
  const pathname = usePathname();
  const linkColor = useColorModeValue("gray.800", "white");
  return (
    <Flex gap={6} align="center">
      {routes.map((route, index) => (
        <Link
          as={RouterLink}
          href={route.path}
          key={index}
          color={linkColor}
          fontSize="sm"
          fontWeight={pathname.indexOf(route.path) > -1 ? "bold" : "normal"}
          lineHeight={6}
          py={2}
          textTransform="uppercase"
          textDecoration="none"
          _hover={{ color: "primary.500", textDecoration: "none" }}
          suppressHydrationWarning
        >
          {route.label}
        </Link>
      ))}
      <Link
        href="https://insights.rootsystem.com"
        color={linkColor}
        fontSize="sm"
        fontWeight="normal"
        lineHeight={6}
        py={2}
        textTransform="uppercase"
        textDecoration="none"
        _hover={{ color: "primary.500", textDecoration: "none" }}
        suppressHydrationWarning
      >
        Insights
      </Link>
    </Flex>
  );
});

const MobileNav = memo(({ colorMode }) => {
  const pathname = usePathname();
  const flexBgColor = useColorModeValue("white", "gray.900");
  const linkColor = useColorModeValue("gray.700", "gray.200");
  return (
    <Flex
      align="center"
      bgColor={flexBgColor}
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
      suppressHydrationWarning
    >
      {routes.map((route, index) => (
        <Link
          as={RouterLink}
          href={route.path}
          key={index}
          color={linkColor}
          display="block"
          fontFamily="heading"
          fontSize="2xl"
          fontWeight={pathname.indexOf(route.path) > -1 ? "bold" : "normal"}
          lineHeight={8}
          py={4}
          textTransform="uppercase"
          suppressHydrationWarning
        >
          {route.label}
        </Link>
      ))}
    </Flex>
  );
});

export const Header = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const viewport = useBreakpointValue({ base: "mobile", md: "desktop" });
  const logoColor = useColorModeValue("gray.800", "white");
  const toggleLabel = useColorModeValue("Switch to dark mode", "Switch to light mode");

  return (
    <>
      {viewport === "mobile" && isOpen && <MobileNav colorMode={colorMode} />}

      <Flex
        align="center"
        as="header"
        justify="space-between"
        py={[3, 7]}
        zIndex={2}
      >
        <Link
          as={RouterLink}
          href="/"
          color={logoColor}
          display="flex"
          alignItems="center"
          suppressHydrationWarning
        >
          <ClientOnly>
            <Logomark boxSize={16} />
          </ClientOnly>
          <Heading as="span" letterSpacing="tighter" size="lg">
            Root System
          </Heading>
        </Link>

        <Stack
          align="center"
          isInline={true}
          justify="flex-end"
          spacing={viewport === "mobile" ? 2 : 6}
        >
          {viewport === "desktop" && <DesktopNav colorMode={colorMode} />}

          <ClientOnly>
            <IconButton
              aria-label={toggleLabel}
              icon={<ColorModeIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              _focus={{ outline: 0 }}
              suppressHydrationWarning
            />
          </ClientOnly>

          {viewport === "mobile" && (
            <IconButton
              aria-label={``}
              icon={<HiMenu />}
              onClick={onToggle}
              variant="ghost"
              _focus={{ outline: 0 }}
            />
          )}
        </Stack>
      </Flex>
    </>
  );
});
