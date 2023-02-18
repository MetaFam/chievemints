import generalStyles from '../styles/general.module.css'
import homeStyles from '../styles/home.module.css'
import headerStyles from '../styles/Header.module.css'
import tokenFilterFormStyles from '../styles/TokenFilterForm.module.css'
import { Styles } from './types'

const imports: Record<string, CSSModuleClasses> = {
  general: generalStyles,
  home: homeStyles,
  Header: headerStyles,
  TokenFilterForm: tokenFilterFormStyles,
}


export const useStyles = (...ids: Array<string>) => {
  let styles = Object.values(imports)
  if(ids.length === 0) {
    styles = ids.map(
      (id) => imports[id] ?? (() => {
        throw new Error(`Unrecognized style id: ${id}`)
      })()
    )
    if(!ids.includes('general')) {
      styles.unshift(generalStyles) // defaults
    }
  }

  const ss: Styles = (
    (...names: Array<string>) => (
      names.map((name) => (
        styles.map((s) => s[name])
        .filter((s) => !!s)
        .join(' ')
      ))
    )
  )
  Object.assign(ss, ...styles)
  return ss
}