import { createConfig, http } from 'wagmi'
import { getDefaultConfig } from 'connectkit'
import { optimism } from 'wagmi/chains'

export const config = createConfig(
  getDefaultConfig({
    chains: [optimism],
    transports: {
      [optimism.id]: (
        import.meta.env.VITE_ALCHEMY_ID
        ? (
          http(`https://opt-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`)
        ) : (
          (() => { throw new Error('Missing $ALCHEMY_ID') })()
        )
      ),
    },

    walletConnectProjectId: (
      import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
      ?? (() => {
        throw new Error('Missing $WALLET_CONNECT_PROJECT_ID')
      })()
    ),
    appName: '’Chievemints',

    // Optional
    appDescription: 'MetaGame’s ’Chievemints accomplishment attestations.',
    appUrl: window.location.host,
    appIcon: 'https://chiev.es/logo.svg', // max. 1MiB
  }),
)

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
