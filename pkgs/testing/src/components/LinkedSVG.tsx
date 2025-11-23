import React, {
  type SyntheticEvent, useCallback, useRef,
} from 'react'
import { Link } from 'react-router'

export const LinkedSVG: React.FC<
  {
    href?: string
    svg: string
    ref?: React.Ref<HTMLObjectElement | null>
  } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>
> = ({ href = '#', svg: data, ref, ...props }) => {
  const svg = useRef<HTMLObjectElement | null>(null)
  const link = useRef<HTMLAnchorElement | null>(null)
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
        link.current?.click()
      }
      root.addEventListener('click', listener)
      return () => root.removeEventListener('click', listener)
    },
    [],
  )

  const setRef = useCallback(
    (elem: HTMLObjectElement | null) => {
      svg.current = elem
      if(typeof ref === 'function') {
        ref(elem)
      } else if(ref && 'current' in ref) {
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
}
