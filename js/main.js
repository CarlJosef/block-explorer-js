// Main application entry point and event wiring.
import {
  getBalance,
  getBlockNumber,
  sendTransaction,
} from "./services/blockchainService.js";
import { dom } from "./ui/dom.js";
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.2/ethers.min.js";
import {
  renderBalance,
  renderBlockCount,
  renderTransactionResult,
  renderStatus,
} from "./ui/render.js";

function isValidAddress(address) {
  return ethers.isAddress(address);
}

function isValidPrivateKey(privateKey) {
  console.log("Private key length:", privateKey.length);
  console.log("Private key starts with 0x:", privateKey.startsWith("0x"));

  return /^0x[a-fA-F0-9]{64}$/.test(privateKey);
}

function isValidAmount(amount) {
  return !Number.isNaN(Number(amount)) && Number(amount) > 0;
}

// Handle balance lookup for a wallet address.
async function handleGetBalance() {
  try {
    renderStatus("Loading balance...");

    const address = dom.addressInput.value.trim();
    if (!isValidAddress(address)) {
      throw new Error("Invalid wallet address.");
    }
    const balance = await getBalance(address);

    renderBalance(balance);
    renderStatus("Balance loaded.");
  } catch (error) {
    renderStatus(`Error: ${error.message}`);
  }
}

// Handle blockchain block count lookup.
async function handleGetBlockCount() {
  try {
    renderStatus("Loading block count...");

    const blockCount = await getBlockNumber();

    renderBlockCount(blockCount);
    renderStatus("Block count loaded.");
  } catch (error) {
    renderStatus(`Error: ${error.message}`);
  }
}

// Handle transaction submission.
async function handleSendTransaction() {
  try {
    renderStatus("Sending transaction...");

    const privateKey = dom.privateKeyInput.value.trim();
    const to = dom.toInput.value.trim();
    const amount = dom.amountInput.value.trim();

    if (!isValidPrivateKey(privateKey)) {
      throw new Error("Invalid private key.");
    }

    if (!isValidAddress(to)) {
      throw new Error("Invalid recipient address.");
    }

    if (!isValidAmount(amount)) {
      throw new Error("Invalid transaction amount.");
    }

    const transactionHash = await sendTransaction(privateKey, to, amount);

    renderTransactionResult(transactionHash);
    renderStatus("Transaction sent.");
  } catch (error) {
    renderStatus(`Error: ${error.message}`);
  }
}

// Register UI event listeners.
dom.getBalanceButton.addEventListener("click", handleGetBalance);
dom.getBlockCountButton.addEventListener("click", handleGetBlockCount);
dom.sendTransactionButton.addEventListener("click", handleSendTransaction);
