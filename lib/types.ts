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


export enum TierStatus {
  SoldOut = "Sold out",
  Selling = "Selling"
}

export type TierSoldOut = {
  id: number;
  status: TierStatus.SoldOut;
  price: number;
};

export type TierSelling = {
  id: number;
  status: TierStatus.Selling;
  price: number;
  total: number;
  available: number;
};

export type Tier = TierSoldOut | TierSelling;

export type Config = {
  nodeSaleAddress: Address
}
