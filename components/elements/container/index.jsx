import { memo } from "react"
import { Box } from "@chakra-ui/react"

export const Container = memo(props => {
  return (
    <Box
      maxWidth="6xl"
      mx="auto"
      px={4}
      {...props}
    />
  )
})