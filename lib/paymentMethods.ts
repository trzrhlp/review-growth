export const defaultPaymentCurrency = "usdttrc20";
export const alternativePaymentCurrencies = ["usdterc20", "eth", "btc"] as const;
export const paymentCurrencies = [
  defaultPaymentCurrency,
  ...alternativePaymentCurrencies,
] as const;

export type PaymentCurrency = (typeof paymentCurrencies)[number];

export const paymentCurrencyLabels: Record<PaymentCurrency, string> = {
  usdttrc20: "USDT TRC20",
  usdterc20: "USDT ERC20",
  eth: "ETH",
  btc: "BTC",
};

export function isPaymentCurrency(value: unknown): value is PaymentCurrency {
  return (
    typeof value === "string" &&
    paymentCurrencies.includes(value as PaymentCurrency)
  );
}
