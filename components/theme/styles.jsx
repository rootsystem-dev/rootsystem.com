import { mode } from "@chakra-ui/theme-tools"

export const styles = {
  global: (props) => ({
    "body": {
      bg: mode("white", "black")(props),
      color: mode("gray.800", "white")(props),
    },

    "::-moz-selection": {
      bg: mode("primary.100", "gray.800")(props)
    },

    "::selection": {
      bg: mode("primary.100", "gray.800")(props)
    },

    "article a": {
      color: "primary.500",
    },

    "article a:focus, article a:hover, article a:active": {
      color: mode("primary.600", "primary.300")(props),
      textDecoration: "underline"
    },

    "article img": {
      mb: 8
    },

    "article figure": {
      color: "gray.500",
      display: "block",
      fontSize: "xs",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: 6,
      mb: 6,
      mt: -6
    },

    "article p, article ol, article ul": {
      fontSize: "md",
      lineHeight: "sm",
      mb: 2
    },

    "article ol, article ul": {
      pl: 6
    },

    "article ol > li, article ul > li": {
      pl: 0
    },

    "h1, h2, h3, h4": {
      fontFamily: "heading",
      fontStyle: "normal",
      fontWeight: "bold",
      letterSpacing: "tight",
      mt: 0
    },

    "h1": {
      fontSize: [ "4xl", "6xl" ],
      lineHeight: [ "3xl", "4xl" ],
      mb: 6
    },

    "h2": {
      fontSize: [ "2xl", "4xl" ],
      lineHeight: [ "xl", "3xl" ],
      mb: 6,
      mt: 8
    },

    "h3": {
      fontSize: [ "xl", "2xl" ],
      lineHeight: [ "lg", "xl" ],
      mb: 5,
      mt: 6
    },

    "h4": {
      fontSize: [ "lg", "xl" ],
      lineHeight: [ "md", "lg"],
      mb: 4,
      mt: 4
    },

    "blockquote": {
      borderLeftColor: mode("gray.200", "gray.700")(props),
      borderLeftWidth: 4,
      color: mode("gray.700", "gray.200")(props),
      fontFamily: "heading",
      fontSize: "xl",
      letterSpacing: "tight",
      mb: 8,
      mt: 6,
      pl: 4,
      py: 1,
      transition: "none"
    },

    "blockquote p": {
      fontFamily: "heading",
      fontSize: "xl",
      lineHeight: "xl"
    },

    "blockquote cite": {
      display: "block",
      color: "gray.500",
      fontFamily: "body",
      fontSize: "xs",
      fontStyle: "normal",
      fontWeight: "semibold",
      lineHeight: 6
    },

    "hr": {
      borderColor: mode("gray.200", "black.800")(props),
      mx: "auto",
      my: 11
    },

    "code, pre": {
      color: mode("gray.700", "gray.300")(props),
      direction: "ltr",
      fontFamily: "monospace",
      fontSize: "sm",
      hyphens: "none",
      lineHeight: 5,
      tabSize: 4,
      textAlign: "left",
      whiteSpace: "pre",
      wordBreak: "normal",
      wordSpacing: "normal",
      // 	-moz-tab-size: 4;
      // 	-o-tab-size: 4;
      // 	-webkit-hyphens: none;
      // 	-moz-hyphens: none;
      // 	-ms-hyphens: none;
    },

    "code[class*=\"language-\"], pre[class*=\"language\"]": {},

    "pre > code[class*=\"language-\"]": {
      fontSize: "sm"
    },

    // Blocks
    "pre[class*=\"language\"]": {
      bgColor: mode("gray.100", "gray.900")(props),
      borderRadius: 4,
      m: 0,
      mb: 3,
      overflow: "auto",
      p: 4,
    },

    "pre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection": {
      bgColor: mode("gray.300", "gray.700")(props)
    },

    // Inline
    ":not(pre) > code[class*=\"language-\"]": {
      bgColor: "gray.50",
      borderRadius: 2,
      px: 1,
      py: "px"
    },

    ".token.comment, .token.prolog, .token.doctype, .token.cdata": {
      color: mode("gray.500", "gray.500")(props),
      fontStyle: "italic"
    },

    ".token.namespace": {
      opacity: 0.7
    },

    ".token.string, .token.attr-value": {
      color: mode("purple.500", "purple.300")(props)
    },

    ".token.punctuation, .token.operator": {
      color: mode("gray.700", "gray.400")(props)
    },

    ".token.entity, .token.url, .token.symbol, .token.number, .token.boolean, .token.variable, .token.constant, .token.property, .token.regex, .token.inserted": {
      color: mode("teal.500", "teal.300")(props)
    },

    ".token.atrule, .token.keyword, .token.attr-name, .language-autohotkey .token.selector": {
      color: mode("pink.500", "pink.300")(props)
    },

    ".token.function, .token.deleted, .language-autohotkey .token.tag": {
	    color: mode("purple.500", "purple.300")(props)
    },

    ".token.tag, .token.selector, .language-autohotkey .token.keyword": {
      color: mode("blue.500", "blue.300")(props)
    },

    ".token.important, .token.function, .token.bold": {
      fontWeight: "bold"
    },

    ".token.italic": {
      fontStyle: "italic"
    }
  })
}