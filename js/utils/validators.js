// Validate an Ethereum wallet address.
export function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Validate a private key in hexadecimal format.
export function isValidPrivateKey(privateKey) {
  return /^0x[a-fA-F0-9]{64}$/.test(privateKey);
}

// Validate that the amount is a positive number.
export function isValidAmount(amount) {
  return !Number.isNaN(Number(amount)) && Number(amount) > 0;
}
