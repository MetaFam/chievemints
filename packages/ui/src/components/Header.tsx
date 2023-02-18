import { Tooltip } from 'react-tooltip'
import { LinkedSVG } from '@/components'
import React, { HTMLAttributes } from 'react'
import styles from '../styles/home.module.css'
import { Styles } from '@/lib/types'
import { useStyles } from '@/lib/styles'

export const Header: React.FC<
  HTMLAttributes<HTMLDivElement>
  & { links?: Record<'cup' | 'sign', string> }
> = ({ links = { cup: '/new', sign: '/' }, ...props }) => {
  const ss: Styles = useStyles()

  return (
    <section {...props}>
      <LinkedSVG
        id={ss.cup}
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
        svg="header.svg"
        href={links.sign}
      />
      <Tooltip
        anchorId={ss.sign}
        place="bottom"
        content="List Existing Tokens"
      />
    </section>
  )
}

export default Header