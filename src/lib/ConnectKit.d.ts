export declare const config: import("wagmi").Config<readonly [import("viem").Chain, ...import("viem").Chain[]], Record<number, import("wagmi").Transport<string, Record<string, any>, import("viem").EIP1193RequestFn>>, readonly import("wagmi").CreateConnectorFn[]>;
declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}
