export function toRupee(
  amount: number,
  locale: string = "en-IN",
  currency: string = "INR"
): string {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
