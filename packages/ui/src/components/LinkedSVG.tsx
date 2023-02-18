import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { Styles } from '@/lib/types'
import { useStyles } from '@/lib/styles'

export const LinkedSVG = React.forwardRef<
  HTMLObjectElement,
  Omit<LinkProps, 'to'> & React.RefAttributes<HTMLAnchorElement>
  & { href: string, svg: string }
>(
  ({ href = '#', svg: data, ...props }, ref) => {
    const ss: Styles = useStyles()

    return (
      <Link className={ss.link} to={href} {...props}>
        <div>
          <object {...{ data, ref }}/>
        </div>
      </Link>
    )
  }
)

LinkedSVG.displayName = 'LinkedSVG'

