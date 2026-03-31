import {
  getBalance,
  getBlockNumber,
  sendTransaction,
} from "./services/blockchainService.js";
import {
  renderBalance,
  renderBlockCount,
  renderTransactionResult,
  renderStatus,
} from "./ui/render.js";
import {
  isValidAddress,
  isValidPrivateKey,
  isValidAmount,
} from "./utils/validators.js";

// Handle application flow and UI events.
export class BlockchainApp {
  constructor(dom) {
    this.dom = dom;
  }

  // Register UI event listeners.
  initialize() {
    this.dom.getBalanceButton.addEventListener("click", () =>
      this.handleGetBalance(),
    );
    this.dom.getBlockCountButton.addEventListener("click", () =>
      this.handleGetBlockCount(),
    );
    this.dom.sendTransactionButton.addEventListener("click", () =>
      this.handleSendTransaction(),
    );
  }

  // Fetch and render the balance for a wallet address.
  async handleGetBalance() {
    try {
      renderStatus("Loading balance...");

      const address = this.dom.addressInput.value.trim();

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

  // Fetch and render the current block count.
  async handleGetBlockCount() {
    try {
      renderStatus("Loading block count...");

      const blockCount = await getBlockNumber();

      renderBlockCount(blockCount);
      renderStatus("Block count loaded.");
    } catch (error) {
      renderStatus(`Error: ${error.message}`);
    }
  }

  // Validate transaction input and send the transaction.
  async handleSendTransaction() {
    try {
      renderStatus("Sending transaction...");

      const privateKey = this.dom.privateKeyInput.value.trim();
      const to = this.dom.toInput.value.trim();
      const amount = this.dom.amountInput.value.trim();

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
}
