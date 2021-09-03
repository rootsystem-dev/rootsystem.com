
import { memo } from "react"
import { Box, Text } from "@chakra-ui/react"

export const Footer = memo(() => {
  const date = new Date()
  return (
    <Box
      as="footer"
      mt={8}
      px={4}
      py={6}
      textAlign="center"
    >
      <Text
        as="div"
        color="gray.500"
        fontSize="xs"
      >
        &copy;{date.getFullYear()} &ndash; All rights reserved
      </Text>
    </Box>
  )
})