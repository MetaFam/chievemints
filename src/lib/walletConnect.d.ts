import WalletConnectProvider from '@walletconnect/web3-provider';
export declare const options: {
    walletconnect: {
        package: typeof WalletConnectProvider;
        options: {
            rpc: import("./types").NetworkInfo;
        };
    };
};
export default options;
