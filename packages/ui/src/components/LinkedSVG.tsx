import React, {
  SyntheticEvent, useCallback, useEffect, useRef,
} from 'react'
import { Link, LinkProps } from 'react-router-dom'

export const LinkedSVG = React.forwardRef<
  HTMLObjectElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
  & React.RefAttributes<HTMLAnchorElement>
  & { href: string, svg: string }
>(({ href = '#', svg: data, ...props }, ref) => {
  const svg = useRef(null)
  const link = useRef(null)
  const local = !/^(https?:)?(\/\/)/.test(href)

  const onLoad = useCallback(
    (
      { target: { contentDocument: {
        documentElement: root,
      } } }: (
        SyntheticEvent<HTMLObjectElement>
        & { target: { contentDocument: {
          documentElement: Element,
        } } }
      )
    ) => {
      const listener = () => {
        link.current.click()
      }
      root.addEventListener('click', listener)
      return () => root.removeEventListener('click', listener)
    },
    [],
  )

  const setRef = useCallback(
    (elem: HTMLObjectElement) => {
      svg.current = elem
      if(typeof ref === 'function') {
        ref(elem)
      } else if('current' in ref) {
        ref.current = elem
      }
    },
    [],
  )

  return (
    local ? (
      <Link className="link" to={href} ref={link} {...props}>
        <object
          {...{ data, onLoad }}
          ref={setRef}
        />
      </Link>
    ) : (
      null
    )
  )
})

LinkedSVG.displayName = 'LinkedSVG'