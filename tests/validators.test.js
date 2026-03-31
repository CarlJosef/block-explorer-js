import { describe, expect, test } from "vitest";
import {
  isValidAddress,
  isValidPrivateKey,
  isValidAmount,
} from "../js/utils/validators.js";

describe("validators", () => {
  test("should validate a correct Ethereum address", () => {
    const address = "0x80700dc0dF46B600CA6d20951bf8a268Ac603f5A";
    expect(isValidAddress(address)).toBe(true);
  });

  test("should reject an invalid Ethereum address", () => {
    const address = "invalid-address";
    expect(isValidAddress(address)).toBe(false);
  });

  test("should validate a correct private key", () => {
    const privateKey = `0x${"a".repeat(64)}`;
    expect(isValidPrivateKey(privateKey)).toBe(true);
  });

  test("should reject an invalid private key", () => {
    const privateKey = "12345";
    expect(isValidPrivateKey(privateKey)).toBe(false);
  });

  test("should validate a positive transaction amount", () => {
    expect(isValidAmount("0.001")).toBe(true);
  });

  test("should reject zero as transaction amount", () => {
    expect(isValidAmount("0")).toBe(false);
  });

  test("should reject a negative transaction amount", () => {
    expect(isValidAmount("-1")).toBe(false);
  });

  test("should reject a non-numeric transaction amount", () => {
    expect(isValidAmount("abc")).toBe(false);
  });
});
