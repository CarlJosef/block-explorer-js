import { dom } from "./dom.js";

// Render the account balance in ETH.
export function renderBalance(balance) {
  dom.balanceResult.textContent = `Balance: ${balance} ETH`;
}

// Render the current block count.
export function renderBlockCount(blockCount) {
  dom.blockCountResult.textContent = `Blocks: ${blockCount}`;
}

// Render the submitted transaction hash.
export function renderTransactionResult(transactionHash) {
  dom.transactionResult.textContent = `Transaction: ${transactionHash}`;
}

// Render the current application status.
export function renderStatus(message) {
  dom.statusMessage.textContent = message;
}
