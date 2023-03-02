import { Tooltip } from 'react-tooltip'
import { LinkedSVG } from '@/components'
import React, { HTMLAttributes } from 'react'
import { Styles } from '@/lib/types'
import { useStyles } from '@/lib/styles'

export const Header: React.FC<
  HTMLAttributes<HTMLDivElement>
  & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => {
  const ss: Styles = useStyles('Header')

  return (
    <header id={ss.header} {...props}>
      <LinkedSVG
        id={ss.cup}
        className={ss.link}
        svg="logo.svg"
        href={links.cup}
      />
      <Tooltip
        anchorId={ss.cup}
        place="bottom"
        content="Create A New Token Type"
      />
      <LinkedSVG
        id={ss.sign}
        className={ss.link}
        svg="header.svg"
        href={links.sign}
      />
      <Tooltip
        anchorId={ss.sign}
        place="bottom"
        content="List Existing Tokens"
      />
    </header>
  )
}

export default Header