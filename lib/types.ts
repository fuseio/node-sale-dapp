export type MenuItem = {
  title: string;
  link: string;
  isNewTab?: boolean;
}

export type MenuItems = MenuItem[];

export type WalletType = {
  [k: string]: string;
}
