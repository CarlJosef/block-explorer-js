import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.2/ethers.min.js";
import { rpcUrl } from "../config.js";

// Create a JSON-RPC provider for blockchain communication.
const provider = new ethers.JsonRpcProvider(rpcUrl);

// Get the balance for a wallet address and return it in ETH.
export async function getBalance(address) {
  try {
    const balanceWei = await provider.getBalance(address);
    return ethers.formatEther(balanceWei);
  } catch {
    throw new Error("Failed to fetch account balance.");
  }
}

// Get the latest block number from the blockchain.
export async function getBlockNumber() {
  try {
    return await provider.getBlockNumber();
  } catch {
    throw new Error("Failed to fetch block count.");
  }
}

// Create and send a transaction using a private key.
export async function sendTransaction(privateKey, to, amount) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider);

    const transactionResponse = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    return transactionResponse.hash;
  } catch {
    throw new Error("Failed to send transaction.");
  }
}
