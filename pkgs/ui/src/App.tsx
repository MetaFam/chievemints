
import { Helmet } from 'react-helmet'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import React from 'react'
import { WagmiProvider } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { ToastContainer } from 'react-toastify'
import { nftGraph } from '@/config'
import { Web3ContextProvider } from '@/lib/hooks'
import { config as wagmiConfig } from './lib/ConnectKit'
import { Spinner } from './components/Spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Home = React.lazy(() => import('./pages/home'))
const New = React.lazy(() => import('./pages/new'))
const View = React.lazy(() => import('./pages/view'))
const Edit = React.lazy(() => import('./pages/edit'))
const Disburse = React.lazy(() => import('./pages/disburse'))
const SelfMint = React.lazy(() => import('./pages/self-mint'))
const Owners = React.lazy(() => import('./pages/owners'))
const Permissions = React.lazy(() => import('./pages/permissions'))
const FreeMushroom = React.lazy(() => import('./pages/mushroom'))

const apolloClient = new ApolloClient({
  uri: nftGraph,
  cache: new InMemoryCache(),
})

const queryClient = new QueryClient();

const App: React.FC = () => (
  <>
    <Helmet>
      <link rel="shortcut icon" href="favicon.svg"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Helmet>
    <ApolloProvider client={apolloClient}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
              <Web3ContextProvider>
                <React.Suspense fallback={<Spinner/>}>
                  <Router>
                    <Routes>
                      <Route path="/new" element={<New/>} />
                      <Route path="/view/:nftId" element={<View/>} />
                      <Route path="/self-mint/:nftId" element={<SelfMint/>} />
                      <Route path="/disburse/:nftId" element={<Disburse/>} />
                      <Route path="/owners/:nftId" element={<Owners/>} />
                      <Route path="/edit/:nftId" element={<Edit/>} />
                      <Route path="/permissions/:nftId" element={<Permissions/>} />
                      <Route path="/mushy" element={<FreeMushroom/>} />
                      <Route path="/" element={<Home/>} />
                    </Routes>
                  </Router>
                </React.Suspense>
              </Web3ContextProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloProvider>
    <ToastContainer
      position="bottom-center"
      autoClose={15000}
      closeOnClick
      pauseOnHover
    />
  </>
)

export default App 