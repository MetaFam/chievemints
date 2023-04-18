import { LinkedSVG } from '@/components'
import React from 'react'
import '../styles/HomeLink.css'

export const HomeLink: React.FC = () => (
  <LinkedSVG
    href="/"
    svg="/favicon.svg"
    id="homeLink"
  />
)

export default HomeLink