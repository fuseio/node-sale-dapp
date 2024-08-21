import { createPublicClient, createWalletClient, custom, http, parseEther } from "viem";
import { NodeSaleAbi } from "./abi/NodeSale";
import { fuse, fuseSparknet } from "viem/chains";
import { CONFIG, NEXT_PUBLIC_ENVIRONMENT } from "./config";
import { waitForTransactionReceipt } from "viem/actions";
import { hex } from "./helpers";

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

const client = () => {
  return createWalletClient({
    chain: NEXT_PUBLIC_ENVIRONMENT === "production" ? fuse : fuseSparknet,
    transport: custom(window.ethereum)
  });
}

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


export const mint = async (price: number, amount: number) => {
  try {
    const walletClient = client();
    const [account] = await walletClient.getAddresses();

    const { request } = await publicClient().simulateContract({
      address: CONFIG.nodeSaleAddress,
      abi: NodeSaleAbi,
      account,
      functionName: "mint",
      value: parseEther((price * amount).toString()),
      args: [account, BigInt(amount), hex],
    });
    const hash = await walletClient.writeContract(request);

    return waitForTransactionReceipt(publicClient(), {
      hash,
    });
  } catch (e) {
    console.log(e);
  }
};
