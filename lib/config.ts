import { fuse, fuseSparknet } from "viem/chains"
import { hex } from "./helpers"
import { Config } from "./types"

export const GENERATE_SOURCEMAP = process.env.GENERATE_SOURCEMAP ?? ""
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""
export const NEXT_PUBLIC_YANDEX_METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ?? ""
export const NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ""
export const NEXT_PUBLIC_WEB3AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ?? ""
export const NEXT_PUBLIC_COIN_GECKO_API_KEY = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY ?? ""
export const NEXT_PUBLIC_ENVIRONMENT = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY ?? ""


export const CONFIG: Config = {
  nodeSaleAddress: NEXT_PUBLIC_ENVIRONMENT === "production" ? hex : "0x6a20b2263f9D0cec5B3dE07a205dF351f1Fa4977",
  chain: NEXT_PUBLIC_ENVIRONMENT === "production" ? fuse : fuseSparknet
}
