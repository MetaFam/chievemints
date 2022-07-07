import { Maybe } from '../lib/types'
import { ReactNode, useCallback, useRef, useState } from 'react'
import { Box, chakra, Flex, FormLabel, Link, Text } from '@chakra-ui/react'

export const Anchor = ({ name }: { name: string }) => {
  const anchor = name.toLowerCase().replace(/\s+/g, '-')

  return (
    <Link
      id={anchor}
      href={`#${anchor}`}
      style={{ textDecoration: 'none' }}
      tabIndex={-1}
    >
      <chakra.span role="img" aria-label="Link">🔗</chakra.span>
    </Link>
  )
}

const Label = ({ name }: { name: string }) => (
  <Flex ml="-2.75em" mt={-1.5}>
    <Anchor {...{ name }} />
    <Text ml={3} mr={2}>■</Text>
    <FormLabel whiteSpace="pre">{name}:</FormLabel>
  </Flex>
)

export const Expandable = ({ name, button = null, children }) => {
  const [hide, setHide] = useState<Record<string, boolean>>({})
  const toggle = useCallback((prop) => {
    setHide(h => ({ ...h, [prop]: !h[prop] }))
  }, [])
  const box = useRef<HTMLDivElement>(null)

  return (
    <Box ref={box}>
      <Flex ml="-3em" mt={3} align="center">
        <Anchor {...{ name, box }} />
        <Text
          ml={3}
          cursor={hide[name] ? 'zoom-in' : 'zoom-out'}
          onClick={() => toggle(name)}
          _after={{ content: '":"'}}
        >
          <chakra.span mr={2}>
            {hide[name] ? '▸' : '▾'}
          </chakra.span>
          {name}
        </Text>
        {!hide[name] && button}
      </Flex>
      {!hide[name] && children}
    </Box>
  )
}

export default Expandable