import { Tooltip } from 'react-tooltip'
import { extractMessage, httpURL, regexify } from '@/lib/helpers'
import type { TokenState } from '@/lib/types'
import Markdown from 'react-markdown'
import React from 'react'
import { useStyles } from '@/lib/styles'
import { ClimbingBoxLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

type IndexedToken = { token: TokenState, index: number }
type Token = { token: TokenState }

const Id:React.FC<IndexedToken> = ({ token }) => {
  const ss = useStyles('TokensTable')

  return (
    <section>
      <p id={ss.id}>
        <span>{token.index}</span>
        {token.gates != null && (
          <span title={`Controls Token #${token.gates}`}>
            ({token.gates === 0 ? 'all' : token.gates})
          </span>
        )}
        {token.is?.disabling && (
          <span>(disabled)</span>
        )}
      </p>
      <Tooltip
        anchorId={ss.id}
        place="bottom"
        content={token.id != null ? (
          regexify(token.id)
        ) : (
          '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'
        )}
      />
    </section>
  )
}

const Error:React.FC<Token> = ({ token }) => {
  const ss = useStyles('TokensTable')

  return (
    <section className={ss.error}>
      <p>{extractMessage(token.error)}</p>
    </section>
  )
}

const Loading:React.FC<
  Token & { label?: string }
> = (
  ({ label = 'Loading Metadata…', ...props }) => {
    const ss = useStyles('TokensTable')

    return (
      <section className={ss.loading} {...props}>
        <p>{label}</p>
      </section>
    )
  }
)

const Image:React.FC<Token> = ({ token }) => (
  <div>
    <Link to={`/view/${regexify(token.id)}`}>
      {token.metadata?.image && (
        <object
          data={httpURL(token.metadata.image) ?? undefined}
          title={token.metadata?.name ?? 'Untitled'}
        />
      )}
      <p>{token.metadata?.name ?? (
        <em>Untitled</em>
      )}</p>
    </Link>
  </div>
)

const Description:React.FC<Token> = ({ token }) => (
  <div>
    {token.is?.disabling && (
      <p>
        This token disables the following permission for
        <Link to={`/view/${token.gates}`}>
          the token at index #{token.gates}
        </Link>:
      </p>
    )}
    {token.is?.gating && (
      <p>
        This token gives holders the following permission for
        {token.gates === 0 ? (
          ' all tokens'
        ) : (
          <Link to={`/view/${token.gates}`}>
            the token at index #{token.gates}
          </Link>
        )}:
      </p>
    )}
    <Markdown linkTarget="_blank">
      {token.is?.disabling || token.is?.gating ? (
        `> ${token.metadata.description.replace(/\n/g, "\n> ")}`
      ) : (
        token.metadata?.description ?? (
          '*No Description*'
        )
      )}
    </Markdown>
  </div>
)

const LinkLink:React.FC<Token> = ({ token }) => {
  const ss = useStyles('TokensTable')
  return (
    <div>
      {token.metadata?.external_url && (
        <Link to={token.metadata.external_url}>
          <span id={ss.link}>🌐</span>
          <Tooltip anchorId={ss.link}>
            {token.metadata.external_url}
          </Tooltip>
        </Link>
      )}
    </div>
  )
}

const URI:React.FC<Token> = ({ token }) => {
  const ss = useStyles('TokensTable')

  return (
    <div>
      {token.uri && (
        <div>
          <Link to={httpURL(token.uri) ?? undefined}>
            <span id={ss.uri}>🔗</span>
            <Tooltip anchorId={ss.uri}>
              {token.uri}            
            </Tooltip>
          </Link>
          <div
            onClick={() => {
              if(
                token.uri
                && typeof navigator !== 'undefined'
                && window.isSecureContext
              ) {
                navigator.clipboard?.writeText(token.uri)
              }
            }}
          >
            <span id={ss.copy}>📋</span>
            <Tooltip>Copy to Clipboard</Tooltip>
          </div>
        </div>
      )}
    </div>
  )
}

const Total:React.FC<Token> = ({ token }) => (
  <div>
    <Link to={`/owners/${regexify(token.id)}`}>
      {token.total?.toString() ?? <ClimbingBoxLoader color="#FE0235"/>}
      {' ⁄ '}
      {token.max?.toString() ?? <ClimbingBoxLoader color="#EF2299"/>}
    </Link>
  </div>
)

const Actions:React.FC<Token> = ({ token }) => {
  const ss = useStyles('TokensTable')
  const id = regexify(token.id)

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/edit/${id}`}>
            <span id={ss.edit}>✏️</span>
            <Tooltip anchorId={ss.edit}>Edit Metadata</Tooltip>
          </Link>
        </li>
        <li>
          <Link to={`/view/${id}`}>
            <span id={ss.view}>👁</span>
            <Tooltip>View This NFT</Tooltip>
          </Link>
        </li>
        <li>
          <Link to={`/disburse/${id}`}>
            <span id={ss.disburse}>💸</span>
            <Tooltip anchorId={ss.disburse}>
              Disburse This NFT
            </Tooltip>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export const TokensTable: React.FC<{
  tokens: Array<TokenState | Error>
}> = ({ tokens }) => {
  const ss = useStyles('TokensTable')
  
  return (
    <section id={ss.tokens}>
      {tokens.map((token: TokenState, index) => {
        if(token.is?.hidden) {
          return null
        }
        return (
          <div key={index}>
            <Id {...{ token, index }}/>
            {(() => {
              if(!token.uri && token.error) {
                return <Error {...{ token }}/>
              }
              if(!token.metadata) {
                return (
                  <Loading
                    label={`${token.uri ? 'Loading' : 'Finding'} Metadata…`}  
                    {...{ token }}
                  />
                )
              }
              return (
                <>
                  <Image {...{ token }}/>
                  <Description {...{ token }}/>
                  <LinkLink {...{ token }}/>
                </>
              )
            })()}
            {token.uri && <URI {...{ token }}/>}
            <Total {...{ token }}/>
            <Actions {...{ token }}/>
          </div>
        )
      })}
    </section>
  )
}

export default TokensTable