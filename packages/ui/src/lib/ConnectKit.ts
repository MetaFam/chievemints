import { createConfig } from 'wagmi'
import { getDefaultConfig } from 'connectkit'

export const config = createConfig(
  getDefaultConfig({
    // Required
    alchemyId: (
      import.meta.env.VITE_ALCHEMY_ID
      ?? (() => { throw new Error('Missing $ALCHEMY_ID') })()
    ), // or infuraId
    walletConnectProjectId: (
      import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
      ?? (() => {
        throw new Error('Missing $WALLET_CONNECT_PROJECT_ID')
      })()
    ),
    appName: '’Chievemints',

    // Optional
    appDescription: 'MetaGame’s ’Chievemints accomplishment attestations.',
    appUrl: "https://chiev.es",
    appIcon: "https://chiev.es/logo.svg", // no bigger than 1024x1024px (max. 1MB)
  }),
)

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
