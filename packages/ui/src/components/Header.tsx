import { LinkedSVG } from '@/components'
import React, { HTMLAttributes } from 'react'
import Tippy from '@tippyjs/react'
import Hs from '../styles/Header.module.css'

export const Header: React.FC<
  HTMLAttributes<HTMLDivElement>
  & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => (
  <header id={Hs.style} {...props}>
    <Tippy content="Create A New Token Type">
      <LinkedSVG
        id={Hs.cup}
        className="link"
        svg="logo.svg"
        href={links.cup}
      />
    </Tippy>
    <Tippy content="List Existing Tokens">
      <LinkedSVG
        id={Hs.sign}
        className={Hs.link}
        svg="header.svg"
        href={links.sign}
      />
    </Tippy>
  </header>
)

export default Header