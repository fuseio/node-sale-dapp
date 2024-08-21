import { createPublicClient, http } from "viem";
import { NodeSaleAbi } from "./abi/NodeSale";
import { fuse, fuseSparknet } from "viem/chains";
import { CONFIG, NEXT_PUBLIC_ENVIRONMENT } from "./config";

const publicClient = () => {
  return createPublicClient({
    chain: NEXT_PUBLIC_ENVIRONMENT === "production" ? fuse : fuseSparknet,
    transport: http(
      NEXT_PUBLIC_ENVIRONMENT === "production" ?
      fuse.rpcUrls.default.http[0] :
      fuseSparknet.rpcUrls.default.http[0]
    ),
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
