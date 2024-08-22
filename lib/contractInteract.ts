import { Address, createPublicClient, http } from "viem";
import { NodeSaleAbi } from "./abi/NodeSale";
import { CONFIG } from "./config";

const publicClient = () => {
  return createPublicClient({
    chain: CONFIG.chain,
    transport: http(CONFIG.chain.rpcUrls.default.http[0]),
  });
};

export const getTotalSupply = () => {
  return publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "totalSupply",
    args: []
  });
};

export const getCurrentTierDetail = () => {
  return publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "getCurrentTierDetail",
    args: []
  });
};

export const getTierDetails = () => {
  return publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "getTierDetails",
    args: []
  });
};

export const getMaxTier = () => {
  return publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "getMaxTier",
    args: []
  });
};

export const getBalanceOfBatch = (addresses: Address[], ids: bigint[]) => {
  return publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "balanceOfBatch",
    args: [addresses, ids]
  });
};
