// https://github.com/chakra-ui/chakra-ui/tree/master/packages/theme
import { 
  extendTheme,
  theme as baseTheme,
  withDefaultColorScheme
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

import { colors } from "./colors"
import { components } from "./components"
import { global } from "./global"
import { styles } from "./styles"

const theme = extendTheme(
  {
    colors: {
      ...colors,
      primary: baseTheme.colors.green
    },
    components,
    config: {
      initialColorMode: "system",
      useSystemColorMode: false,
    },
    fonts: {
      body: "'Open Sans', 'ui-sans-serif', sans-serif",
      heading: "'Tiempos', 'ui-serif', serif",
      mono: "'ui-monospace'"
    },
    fontSizes: {
      "xs": "0.8125rem",
      "sm": "0.8750rem",
      "md": "0.9375rem",
      "base": "1.000rem",
      "lg": "1.1250rem",
      "xl": "1.3125rem",
      "2xl": "1.4375rem",
      "3xl": "1.5rem",
      "4xl": "1.8125rem",
      "5xl": "2.0rem",
      "6xl": "2.7500rem",
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      none: "1",
      normal: "normal",

      shorter: "1rem",
      short: "1.25rem",
      base: "1.5rem",
      tall: "1.75rem",
      taller: "2rem",

      "xs": "1.5rem",
      "sm": "1.750rem",
      "md": "2.000rem",
      "lg": "2.000rem",

      "xl": "2.0000rem",
      "2xl": "2.2500rem",
      "3xl": "2.5000rem",
      "4xl": "3.2500rem",
    },
    letterSpacings: {
      tighter: "-0.025em",
      tight: "-0.0125em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    shadows: {
      "text-overlay": "1px 2px 4px rgba(0, 0, 0, 0.24)"
    },
    space: {
      "px": "1px",
      "0": "0px",
      "1": "0.25rem",
      "2": "0.50rem",
      "3": "0.75rem",
      "4": "1.00rem",
      "5": "1.25rem",
      "6": "1.50rem",
      "7": "1.75rem",
      "8": "2.00rem",
      "9": "2.25rem",
      "10": "2.50rem",
      "11": "2.75rem",
      "12": "3.00rem",
      "13": "3.25rem",
      "14": "3.5rem",
      "15": "3.75rem",
      "16": "4rem",
      "18": "4.5rem",
      "20": "5rem",
      "24": "6rem",
      "28": "7rem",
      "32": "8rem",
      "36": "9rem",
      "40": "10rem",
      "44": "11rem",
      "48": "12rem",
      "52": "13rem",
      "56": "14rem",
      "60": "15rem",
      "64": "16rem",
      "72": "18rem",
      "80": "20rem",
      "96": "24rem"
    },
    styles,
    textStyles: {}
  }, 
  withDefaultColorScheme({ colorScheme: "primary" })
)

export {
  global,
  theme
}