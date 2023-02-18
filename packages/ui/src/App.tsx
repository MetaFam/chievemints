
import { Helmet } from 'react-helmet'
import { Web3ContextProvider } from '@/lib/hooks'
import { ClimbingBoxLoader } from 'react-spinners'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { nftGraph } from '@/config'
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'

const Home = React.lazy(() => import('./pages/home'))
const New = React.lazy(() => import('./pages/new'))
const View = React.lazy(() => import('./pages/view'))
const Edit = React.lazy(() => import('./pages/edit'))
const Disburse = React.lazy(() => import('./pages/disburse'))
const SelfMint = React.lazy(() => import('./pages/self-mint'))
const Owners = React.lazy(() => import('./pages/owners'))

const client = new ApolloClient({
  uri: nftGraph,
  cache: new InMemoryCache(),
})

const App: React.FC = () => (
  <>
    <Helmet>
      <link
        rel="shortcut icon"
        href="favicon.svg"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Helmet>
    <ApolloProvider {...{ client }}>
      <Web3ContextProvider>
        <React.Suspense fallback={<ClimbingBoxLoader/>}>
          <Router>
            <Routes>
              <Route path="/new" element={<New/>} />
              <Route path="/view/:nftId" element={<View/>} />
              <Route path="/self-mint/:nftId" element={<SelfMint/>} />
              <Route path="/disburse/:nftId" element={<Disburse/>} />
              <Route path="/owners/:nftId" element={<Owners/>} />
              <Route path="/edit/:nftId" element={<Edit/>} />
              <Route path="/" element={<Home/>} />
            </Routes>
          </Router>
        </React.Suspense>
      </Web3ContextProvider>
    </ApolloProvider>
  </>
)

export default App 