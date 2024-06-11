export const defines = (env: Record<string, unknown>) => (
  Object.fromEntries(
    Object.entries(env).map(([key, val]) => {
      if(key.startsWith('VITE_RAW_')) {
        return [key.replace(/^VITE_RAW_/, ''), val]
      } else if(key.startsWith('VITE_')) {
        return [key.replace(/^VITE_/, ''), JSON.stringify(val)]
      } else {
        return null
      }
    }).filter((v) => !!v)
  )
)

export const hideValues = (
  (definitions: Record<string, string>) => (
    Object.fromEntries(
      Object.entries(definitions).map(([key, val]) => (
        [key, val.replace(/\w/g, '•')]
      ))
    )
  )
)
