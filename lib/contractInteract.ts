import { Address, createPublicClient, http, parseEther } from "viem";
import { NodeSaleAbi } from "./abi/NodeSale";
import { CONFIG } from "./config";
import { hex } from "./helpers";
import { getAccount, getWalletClient, waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { getConfig } from "./web3Auth";

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

export const mint = async (price: number, amount: number) => {
  try {
    const config = getConfig();
    const walletClient = await getWalletClient(config, { chainId: CONFIG.chain.id });
    const { connector } = getAccount(config);
    if (walletClient) {
      const accounts = await walletClient.getAddresses();
      const account = accounts[0];
      const tx = await writeContract(config, {
        address: CONFIG.nodeSaleAddress,
        abi: NodeSaleAbi,
        account,
        functionName: "mint",
        value: parseEther((price * amount).toString()),
        args: [account, BigInt(amount), hex],
        connector,
        __mode: "prepared",
      });
      await waitForTransactionReceipt(config, {
        chainId: CONFIG.chain.id,
        hash: tx,
      });
      return tx;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
