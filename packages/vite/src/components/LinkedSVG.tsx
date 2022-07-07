import {
  Box, Link as ChakraLink, LinkProps, chakra
} from '@chakra-ui/react'

export const LinkedSVG: React.FC<
  LinkProps & { href: string, svg: string }
> = ({ href, svg: data, ...props }) => (
  <ChakraLink
    position="relative"
    zIndex={1}
    {...props}
    {...{ href }}
  >
    <Box display="inline-block" w="full" h="full">
      <chakra.object
        maxH="100%"
        {...{ data }}
        position="relative"
        zIndex={-1}
      />
    </Box>
  </ChakraLink>
)

