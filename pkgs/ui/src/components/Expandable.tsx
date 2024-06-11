import { Maybe } from '@/lib/types'
import React, {
  ReactNode, useCallback, useRef, useState,
} from 'react'
import { Link } from 'react-router-dom'

export const Anchor = ({ name }: { name: string }) => {
  const anchor = name.toLowerCase().replace(/\s+/g, '-')

  return (
    <Link
      id={anchor}
      to={`#${anchor}`}
    >
      <span role="img" aria-label="Link">🔗</span>
    </Link>
  )
}

export const Label = ({ name }: { name: string }) => (
  <div>
    <Anchor {...{ name }} />
    <span>■</span>
    <label>{name}:</label>
  </div>
)

export const Expandable: React.FC<{
  name: string, button?: Maybe<ReactNode>, children: ReactNode
}> = ({ name, button = null, children }) => {
  const [hide, setHide] = useState<Record<string, boolean>>({})
  const toggle = useCallback((prop: string) => {
    setHide(h => ({ ...h, [prop]: !h[prop] }))
  }, [])
  const box = useRef<HTMLDivElement>(null)

  return (
    <div ref={box}>
      <div>
        <Anchor {...{ name, box }} />
        <p onClick={() => toggle(name)}>
          <span>{hide[name] ? '▸' : '▾'}</span>
          {name}
        </p>
        {!hide[name] && button}
      </div>
      {!hide[name] && children}
    </div>
  )
}

export default Expandable