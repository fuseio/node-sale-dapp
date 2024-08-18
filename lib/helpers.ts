import { WalletType } from "./types";

export const eclipseAddress = (address: string, firstEnd = 6, secondStart = 4): string => {
  return (
    address.substring(0, firstEnd) +
    "..." +
    address.substring(address.length - secondStart, address.length)
  );
};

export const hex = "0x";

export const evmDecimals = 18;

export const IS_SERVER = typeof window === "undefined";
export const IS_ETHEREUM_OBJECT_DETECTED = typeof window !== "undefined" && typeof window.ethereum !== "undefined";

export const walletType: WalletType = {
  "injected": "MetaMask",
  "metaMaskSDK": "MetaMaskSDK",
  "walletConnect": "WalletConnect",
  "coinbaseWallet": "Coinbase",
  "google": "Google",
  "facebook": "Facebook",
  "twitter": "Twitter",
  "discord": "Discord",
  "twitch": "Twitch",
  "github": "GitHub",
  "email_passwordless": "Email"
}

export const detectDevice = () => {
  if (IS_SERVER) {
    return { isIos: null, isAndroid: null, isMobile: null };
  }

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIos || isAndroid;

  return { isIos, isAndroid, isMobile };
}
