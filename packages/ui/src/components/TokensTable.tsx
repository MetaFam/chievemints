/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Tippy from '@tippyjs/react'
import { extractMessage, httpURL, regexify } from '@/lib/helpers'
import type { TokenState } from '@/lib/types'
import Markdown from 'react-markdown'
import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import '../styles/TokensTable.css'

type IndexedToken = { token: TokenState, index: number }
type Token = { token: TokenState }

const Index:React.FC<IndexedToken> = ({ token }) => (
  <div className="index">
    <Tippy
      content={token.id != null ? (
        regexify(token.id)
      ) : (
        '𝚄𝚗𝚔𝚗𝚘𝚠𝚗'
      )}
    >
      <p className="content">
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
  <div className="error">
    <p className="content">{extractMessage(token.error)}</p>
  </div>
)

const Loading:React.FC<{ label?: string }> = (
  ({ label = 'Loading Metadata…', ...props }) => (
    <div className="loading">
      <p className="content" {...props}>{label}</p>
    </div>
  )
)

const Finding:React.FC<{ label?: string }> = (
  ({ label = 'Finding Metadata…', ...props }) => (
    <div className="finding">
      <p className="content" {...props}>{label}</p>
    </div>
  )
)

declare module 'csstype' {
  interface Properties {
    '--img-bg'?: string
  }
}

const Image:React.FC<Token> = ({ token }) => (
  <div className="img" style={{ '--img-bg': `#${token.metadata.background_color}` }}>
    <Link to={`/view/${regexify(token.id)}`} className="content">
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
  <div className="text">
    <div className="title">
      <h2 className="content">
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
    </div>
    <div className="desc">
      {token.is?.disabling && (
        <p className="content">
          This token <b>disables</b> the following permission for{' '}
          <Link to={`/view/i:${token.gates}`}>
            the token at index #{token.gates}
          </Link>:
        </p>
      )}
      {token.is?.gating && (
        <p className="content">
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
      <Markdown linkTarget="_blank" className="content">
        {token.is?.disabling || token.is?.gating ? (
          `> ${token.metadata.description.replace(/\n/g, "\n> ")}`
        ) : (
          token.metadata?.description ?? (
            '*No Description*'
          )
        )}
      </Markdown>
    </div>
  </div>
)

const LinkLink:React.FC<Token> = ({ token }) => (
  <div className="homepage">
    {token.metadata?.external_url && (
      <Tippy content={token.metadata.external_url}>
        <a
          className="content"
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
  (token.uri && (
    <nav className="metainfo">
      <ul>
        <li className="source">
          <Tippy content={token.uri}>
            <a
              className="content"
              href={httpURL(token.uri) ?? undefined}
              target="_blank" rel="noreferrer"
            >
              🔗
            </a>
          </Tippy>  
        </li>
        <li className="clipboard">
          <Tippy content="Copy to Clipboard">
            <button
              className="content"
              onClick={() => {
                if(token.uri && window.isSecureContext) {
                  navigator?.clipboard?.writeText(token.uri)
                }
              }}
            >
              📋
            </button>
          </Tippy>
        </li>
      </ul>
    </nav>
  ))
)

const Total:React.FC<Token> = ({ token }) => {
  const label = `${token.total?.toString()} minted of ${token.max?.toString()} total`

  return (
    <div className="quantity">
      <Link to={`/owners/${regexify(token.id)}`} className="content">
        <Tippy content={label}><>
          <sup>{
            token.total?.toString()
            ?? <ClimbingBoxLoader size={4} color="#FE0235"/>
          }</sup>
          {'⁄'}
          <sub>{
            Number(token.max) < 0 ? '∞' : token.max?.toString()
            ?? <ClimbingBoxLoader size={4} color="#EF2299"/>
          }</sub>
        </></Tippy>
      </Link>
    </div>
  )
}

const Actions:React.FC<Token> = ({ token }) => {
  const id = regexify(token.id)

  return (
    <nav className="actions">
      <ul>
        <li className="edit">
          <Tippy content="Edit Metadata">
            <Link to={`/edit/${id}`} className="content">
              ✏️
            </Link>
          </Tippy>
        </li>
        <li className="view">
          <Tippy content="View This NFT">
            <Link to={`/view/${id}`} className="content">
              👁
            </Link>
          </Tippy>
        </li>
        <li className="disburse">
          <Tippy content="Disburse This NFT">
            <Link to={`/disburse/${id}`} className="content">
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
          <Index {...{ token, index }}/>
          {(() => {
            if(token.error) {
              return <Error {...{ token }}/>
            }
            if(!token.metadata) {
              return (
                !token.uri ? (
                  <Finding/>
                ) : (
                  <Loading/>
                )
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
          <URI {...{ token }}/>
          <Total {...{ token }}/>
          <Actions {...{ token }}/>
        </article>
      )
    })}
  </section>
)

export default TokensTable