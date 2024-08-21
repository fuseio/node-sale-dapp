import { Address } from "viem";

export type MenuItem = {
  title: string;
  link: string;
  isNewTab?: boolean;
}

export type MenuItems = MenuItem[];

export type WalletType = {
  [k: string]: string;
}

export type Config = {
  nodeSaleAddress: Address
}

export type TierDetail = {
  tier: number;
  price: number;
  availableSupply: number;
  maxSupply: number;
}
