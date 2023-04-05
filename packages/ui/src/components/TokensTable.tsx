/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Tippy from '@tippyjs/react'
import { extractMessage, httpURL, regexify } from '@/lib/helpers'
import type { TokenState } from '@/lib/types'
import Markdown from 'react-markdown'
import React, { useMemo, useRef, useEffect } from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import '../styles/TokensTable.css'

type IndexedToken = { token: TokenState, index: number }
type Token = { token: TokenState }

const Id:React.FC<IndexedToken> = ({ token }) => (
  <div className="idElem">
    <Tippy
      content={token.id != null ? (
        regexify(token.id)
      ) : (
        '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'
      )}
    >
      <p id="id">
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
    </Tippy>
  </div>
)

const Error:React.FC<Token> = ({ token }) => (
  <div className="errorElem">
    <p className="error">{extractMessage(token.error)}</p>
  </div>
)

const Loading:React.FC<
  Token & { label?: string }
> = (
  ({ label = 'Loading Metadata…', ...props }) => (
    <div className="loadElem">
      <p className="loading" {...props}>{label}</p>
    </div>
  )
)

const Image:React.FC<Token> = ({ token }) => (
  <div className="imgElem">
    <Link to={`/view/${regexify(token.id)}`} className="image">
      {token.metadata?.image && (
        <img
          src={httpURL(token.metadata.image) ?? undefined}
          alt={token.metadata?.name ?? 'Untitled'}
        />
      )}
    </Link>
  </div>
)

const Description:React.FC<Token> = ({ token }) => (
  <div className="descElem">
    <h2>
      {token.metadata?.name ?? (
        <em>Untitled</em>
      )}
      {token.gates == null ? '' : (
        token.gates === 0 ? (
          ' for all tokens'
        ) : (
          <>
            {' '}for{' '}
            <Link to={`/view/${token.gates}`}>
              #{token.gates}
            </Link>
          </>
        )
      )}
    </h2>
    {token.is?.disabling && (
      <p>
        This token <b>disables</b> the following permission for{' '}
        <Link to={`/view/i:${token.gates}`}>
          the token at index #{token.gates}
        </Link>:
      </p>
    )}
    {token.is?.gating && (
      <p>
        This token gives holders the following permission for{' '}
        {token.gates === 0 ? (
          'all tokens'
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

const LinkLink:React.FC<Token> = ({ token }) => (
  <div className="homepageElem">
    {token.metadata?.external_url && (
      <Tippy content={token.metadata.external_url}>
        <a
          href={token.metadata.external_url}
          target="_blank" rel="noreferrer"
        >
          🌐
        </a>
      </Tippy>
    )}
  </div>
)

const URI:React.FC<Token> = ({ token }) => (
  <nav className="metaElem">
    {token.uri && (
      <ul className="links">
        <li>
          <Tippy content={token.uri}>
            <a
              className="meta"
              href={httpURL(token.uri) ?? undefined}
              target="_blank" rel="noreferrer"
            >
              🔗
            </a>
          </Tippy>
        </li>
        <li>
          <Tippy content="Copy to Clipboard">
            <button onClick={() => {
              if(token.uri && window.isSecureContext) {
                navigator?.clipboard?.writeText(token.uri)
              }
            }}>
              📋
            </button>
          </Tippy>
        </li>
      </ul>
    )}
  </nav>
)

const Total:React.FC<Token> = ({ token }) => {
  const label = `${token.total?.toString()} minted of ${token.max?.toString()} total`

  return (
    <div>
      <Link to={`/owners/${regexify(token.id)}`}>
        <Tippy content={label}><>
          <sup>{
            token.total?.toString()
            ?? <ClimbingBoxLoader color="#FE0235"/>
          }</sup>
          {'⁄'}
          <sub>{
            Number(token.max) === -1 ? '∞' : token.max?.toString()
            ?? <ClimbingBoxLoader color="#EF2299"/>
          }</sub>
        </></Tippy>
      </Link>
    </div>
  )
}

const Actions:React.FC<Token> = ({ token }) => {
  const id = regexify(token.id)

  return (
    <nav>
      <ul className="links">
        <li>
          <Tippy content="Edit Metadata">
            <Link to={`/edit/${id}`}>
              ✏️
            </Link>
          </Tippy>
        </li>
        <li>
          <Tippy content="View This NFT">
            <Link to={`/view/${id}`}>
              👁
            </Link>
          </Tippy>
        </li>
        <li>
          <Tippy content="Disburse This NFT">
            <Link to={`/disburse/${id}`}>
              💸
            </Link>
          </Tippy>
        </li>
      </ul>
    </nav>
  )
}

export const TokensTable: React.FC<{
  tokens: Array<TokenState | Error>
}> = ({ tokens }) => (
  <section id="tokens">
    {tokens.map((token: TokenState, index) => {
      if(token.is?.hidden) {
        return null
      }
      return (
        <article className="token" key={index}>
          <Id {...{ token, index }}/>
          {(() => {
            if(!token.uri && token.error) {
              return <Error {...{ token }}/>
            }
            if(!token.metadata) {
              return (
                <Loading
                  label={
                    token.uri ? 'Loading' : 'Finding'
                    + ' Metadata…'
                  }
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
        </article>
      )
    })}
  </section>
)

export default TokensTable