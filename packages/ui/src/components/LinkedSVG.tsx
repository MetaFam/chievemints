import React, { SyntheticEvent, useEffect, useRef } from 'react'
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
    const svg = useRef(null)
    const link = useRef(null)

    return (
        <Link className={ss.link} to={href} ref={link} {...props}>
        <object
          {...{ data }}
          ref={(elem) => {
            svg.current = elem
            if(typeof ref === 'function') {
              ref(elem)
            } else if(ref) {
              ref.current = elem
            }
          }}
          onLoad={(
            { target: {
              contentDocument: {
                documentElement: root,
              }
            }}: (
              SyntheticEvent<HTMLObjectElement> 
              & { target: {
                contentDocument: {
                  documentElement: Element,
                }
              } }
            )
          ) => {
            const listener = () => {
              link.current.click()
            }
            root.addEventListener('click', listener)
            return () => root.removeEventListener('click', listener)
          }}
        />
      </Link>
    )
  }
)

LinkedSVG.displayName = 'LinkedSVG'