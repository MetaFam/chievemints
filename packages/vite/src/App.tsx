// import '../styles/globals.css'
import {Helmet} from 'react-helmet'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ContextProvider } from './lib/hooks'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client'
import { CONFIG } from './config'
import Home from './pages/home'
import New from './pages/new'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const client = new ApolloClient({
  uri: CONFIG.nftGraph,
  cache: new InMemoryCache(),
})

const App: React.FC = () => (
  <ChakraProvider>
    <Helmet>
      <link
        rel="shortcut icon"
        href="favicon.png"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Helmet>
    <ApolloProvider {...{ client }}>
      <Web3ContextProvider> 
        <Router>
          <Routes>
            <Route path="/new" element={<New/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </Router>
      </Web3ContextProvider>
    </ApolloProvider>
  </ChakraProvider>
)

export default App
