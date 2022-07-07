import {
  Box, Flex, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr,
  Link as ChakraLink, Tooltip, chakra,
} from '@chakra-ui/react'
import { httpURL } from '../lib/helpers'
import { TokenState } from '../lib/types'
// import Link from 'next/link'
import Markdown from 'react-markdown'

type IndexedToken = { token: TokenState, index: number }
type Token = { token: TokenState }

const IdTd:React.FC<IndexedToken> = ({ token, index }) => (
  <Td>
    <Tooltip
      label={token.id != null ? (
        `0x${BigInt(token.id).toString(16)}`
      ) : (
        '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'
      )}
    >
      <Text>{token.index}</Text>
    </Tooltip>
  </Td>
)

const ErrorTd:React.FC<Token> = ({ token }) => (
  <Td colSpan={4}>
    <Flex justify="center">
      <Text color="red" fontStyle="italic">
        {token.error}
      </Text>
    </Flex>
  </Td>
)

const LoadingTd:React.FC<Token> = () => (
  <Td colSpan={3}>
    <Flex justify="center">
      <Spinner thickness="4px"/>
      <Text ml={3}>Loading Metadata…</Text>
    </Flex>
  </Td>
)

const ImageTd:React.FC<Token> = ({ token }) => (
  <Td>
    <Stack>
      <ChakraLink href={`/view/${token.id}`} >
        <ChakraLink>
          <Box
            bg={
              token.metadata?.background_color ? (
                `#${token.metadata.background_color}`
              ) : (
                'transparent'
              )
            }
          >
            {token.metadata?.image && (
              <chakra.object
                data={httpURL(token.metadata.image)}
                title={token.metadata?.name ?? 'Untitled'}
                maxW={32}
                maxH={32}
                objectFit="contain"
                margin="auto"
              />
            )}
          </Box>
          <Text>{token.metadata?.name ?? (
            <Text as="em">Untitled</Text>
          )}</Text>
        </ChakraLink>
      </ChakraLink>
    </Stack>
  </Td>
)

const DescriptionTd:React.FC<Token> = ({ token }) => (
  <Td
    flexGrow={1}
    sx={{ a: { textDecoration: 'underline' } }}
  >
    <Markdown linkTarget="_blank">
      {token.metadata?.description ?? (
        '*No Description*'
      )}
    </Markdown>
  </Td>
)

const LinkTd:React.FC<Token> = ({ token }) => (
  <Td>
    {token.metadata?.external_url && (
      <ChakraLink
        href={token.metadata.external_url}
        isExternal
        fontSize="150%"
      >
        <Tooltip label={token.metadata.external_url} hasArrow>
          🌐
        </Tooltip>
      </ChakraLink>
    )}
  </Td>
)

const URITd:React.FC<Token> = ({ token }) => (
  <Td>
    {token.uri && (
      <Flex justify="center" fontSize="150%">
        <ChakraLink href={httpURL(token.uri)} isExternal>
          <Tooltip label={token.uri} hasArrow>
            🔗
          </Tooltip>
        </ChakraLink>
        <ChakraLink
          ml={2}
          onClick={() => {
            if(token.uri) {
              navigator.clipboard.writeText(token.uri)
            }
          }}
        >
          <Tooltip label="Copy to Clipboard" hasArrow>
            📋
          </Tooltip>
        </ChakraLink>
      </Flex>
    )}
  </Td>
)

const TotalTd:React.FC<Token> = ({ token }) => (
  <Td>
    <ChakraLink href={`/owners/${token.id}`}>
      {token.total?.toString() ?? <Spinner/>}
    </ChakraLink>
  </Td>
)

const ActionsTd:React.FC<Token> = ({ token }) => (
  <Td>
    <Flex justify="center" fontSize="150%">
      <ChakraLink href={`/edit/${token.id}`} >
        <ChakraLink>
          <Tooltip label="Edit Metadata" hasArrow>
            ✏️
          </Tooltip>
        </ChakraLink>
      </ChakraLink>
      <ChakraLink href={`/view/${token.id}`} >
        <ChakraLink ml={2}>
          <Tooltip label="View This NFT" hasArrow>
            👁
          </Tooltip>
        </ChakraLink>
      </ChakraLink>
      <ChakraLink href={`/disburse/${token.id}`} >
        <ChakraLink ml={2}>
          <Tooltip label="Disburse This NFT" hasArrow>
            💸
          </Tooltip>
        </ChakraLink>
      </ChakraLink>
    </Flex>
  </Td>
)

export const TokensTable: React.FC<{
  tokens: Array<TokenState>
}> = ({ tokens }) => {
  return (
    <Table
      sx={{
        'th, td': { textAlign: 'center' },
        a: { borderBottom: '2px dotted transparent' },
        'a:hover': {
          textDecoration: 'none',
          borderBottom: '2px dotted',
        },
      }}
    >
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Display</Th>
          <Th flexGrow={1}>Description</Th>
          <Th>Link</Th>
          <Th>Metadata</Th>
          <Th>Total</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tokens.map((token: TokenState, index) => {
          if(token.hide) {
            return null
          }
          return (
            <Tr key={index}>
              <IdTd {...{ token, index }}/>
              {(() => {
                if(!token.uri && token.error) {
                  return <ErrorTd {...{ token }}/>
                }
                if(!token.metadata) {
                  return <LoadingTd {...{ token }}/>
                }
                return (
                  <>
                    <ImageTd {...{ token }}/>
                    <DescriptionTd {...{ token }}/>
                    <LinkTd {...{ token }}/>
                  </>
                )
              })()}
              {token.uri && <URITd {...{ token }}/>}
              <TotalTd {...{ token }}/>
              <ActionsTd {...{ token }}/>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TokensTable