import { createPublicClient, formatEther, http } from "viem";
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

export const getTotalSupply = async () => {
  const totalSupply = await publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "totalSupply",
    args: []
  });
  return parseFloat(formatEther(totalSupply));
};

export const getCurrentTierDetail = async () => {
  const currentTierDetail = await publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "getCurrentTierDetail",
    args: []
  });
  return currentTierDetail;
};

export const getTierDetails = async () => {
  const tierDetails = await publicClient().readContract({
    address: CONFIG.nodeSaleAddress,
    abi: NodeSaleAbi,
    functionName: "getTierDetails",
    args: []
  });
  return tierDetails;
};
