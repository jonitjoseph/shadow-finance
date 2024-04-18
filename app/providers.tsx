"use client"

import * as React from "react"
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit"
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { sepolia, mainnet } from "wagmi/chains"
import { WagmiProvider, http } from "wagmi"

const { wallets } = getDefaultWallets()

// const local = {
//   id: 31337,
//   name: 'Local',
//   iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'HardhatETH', symbol: 'ETH', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['http://127.0.0.1:8545/'] },
//   },
// } as const satisfies Chain;

// Add 'local' in 'chains' if needed when using hardhat node
const config = getDefaultConfig({
  appName: "shadow-finance",
  projectId: "722505a28a92f4ca4104288c51937481",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/3l3xpCAWDRWFlFimnDy1PWFk8aXkxexM`),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#0c0a09",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
