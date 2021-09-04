import { mode } from "@chakra-ui/theme-tools"

const Heading = {
  baseStyle: {
    fontWeight: "bold"
  },
  variants: {
    "subtle": (props) => ({
      color: mode("gray.700", "white")(props),
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "semibold",
      lineHeight: 7,
      mb: 8,
      "& > a": {
        fontSize: "sm",
        fontWeight: "semibold",
        lineHeight: 7,
        ml: 3
      }
    })
  }
};

const Link = {
  baseStyle: (props) => ({
    color: mode("primary.500", "primary.500")(props),
    cursor: "pointer",
    fontWeight: "semibold",
    _hover: {
      color: mode("primary.600", "primary.400")(props),
      textDecoration: "none"
    }
  }),
  variants: {
    "forward": (props) => ({
      fontSize: "sm",
      fontWeight: "semibold",
      letterSpacing: "tight",
      lineHeight: 7
    }),
    "heading": (props) => ({
      color: mode("gray.700", "white")(props)
    })
  }
}

const Text = {
  variants: {
    "lead": (props) => ({
      color: mode("gray.700", "white")(props),
      fontSize: "lg",
      fontWeight: "regular",
      letterSpacing: "tight",
      lineHeight: 7
    }),
    "meta": (props) => ({
      color: mode("gray.600", "gray.400")(props),
      display: "block",
      fontSize: "xs",
      fontWeight: "regular",
      lineHeight: 7,
      mb: 3
    }),
  }
}

export const components = {
  Heading,
  Link,
  Text
}