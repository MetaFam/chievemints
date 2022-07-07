import { Flex, FlexProps } from '@chakra-ui/react'
import { LinkedSVG } from '../components'

export const Header: React.FC<
  FlexProps & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <Flex  grow={1} {...props}>
    <LinkedSVG
      w="min(40%, 75vh)" h="auto"
      svg="logo.svg"
      href={links.cup}
      title="Create a new Token"
    />
    <LinkedSVG
      w="75%" h="auto"
      ml="-15%"
      svg="header.svg"
      href={links.sign}
      title="View Existing Tokens"
    />
  </Flex>
)

export default Header