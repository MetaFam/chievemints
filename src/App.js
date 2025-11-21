import { Helmet } from 'react-helmet';
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';
import { HashRouter as Router, Routes, Route, } from 'react-router-dom';
import React from 'react';
import { WagmiProvider } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { ToastContainer } from 'react-toastify';
import { nftGraph } from '@/config';
import { Web3ContextProvider } from '@/lib/hooks';
import { config as wagmiConfig } from './lib/ConnectKit';
import { Spinner } from './components/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Home = React.lazy(() => import('./pages/home'));
const New = React.lazy(() => import('./pages/new'));
const View = React.lazy(() => import('./pages/view'));
const Edit = React.lazy(() => import('./pages/edit'));
const Disburse = React.lazy(() => import('./pages/disburse'));
const SelfMint = React.lazy(() => import('./pages/self-mint'));
const Owners = React.lazy(() => import('./pages/owners'));
const Permissions = React.lazy(() => import('./pages/permissions'));
const FreeMushroom = React.lazy(() => import('./pages/mushroom'));
const apolloClient = new ApolloClient({
    uri: nftGraph,
    cache: new InMemoryCache(),
});
const queryClient = new QueryClient();
const App = () => (React.createElement(React.Fragment, null,
    React.createElement(Helmet, null,
        React.createElement("link", { rel: "shortcut icon", href: "favicon.svg" }),
        React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" })),
    React.createElement(ApolloProvider, { client: apolloClient },
        React.createElement(WagmiProvider, { config: wagmiConfig },
            React.createElement(QueryClientProvider, { client: queryClient },
                React.createElement(ConnectKitProvider, null,
                    React.createElement(Web3ContextProvider, null,
                        React.createElement(React.Suspense, { fallback: React.createElement(Spinner, null) },
                            React.createElement(Router, null,
                                React.createElement(Routes, null,
                                    React.createElement(Route, { path: "/new", element: React.createElement(New, null) }),
                                    React.createElement(Route, { path: "/view/:nftId", element: React.createElement(View, null) }),
                                    React.createElement(Route, { path: "/self-mint/:nftId", element: React.createElement(SelfMint, null) }),
                                    React.createElement(Route, { path: "/disburse/:nftId", element: React.createElement(Disburse, null) }),
                                    React.createElement(Route, { path: "/owners/:nftId", element: React.createElement(Owners, null) }),
                                    React.createElement(Route, { path: "/edit/:nftId", element: React.createElement(Edit, null) }),
                                    React.createElement(Route, { path: "/permissions/:nftId", element: React.createElement(Permissions, null) }),
                                    React.createElement(Route, { path: "/mushy", element: React.createElement(FreeMushroom, null) }),
                                    React.createElement(Route, { path: "/", element: React.createElement(Home, null) }))))))))),
    React.createElement(ToastContainer, { position: "bottom-center", autoClose: 15000, closeOnClick: true, pauseOnHover: true })));
export default App;
//# sourceMappingURL=App.js.map