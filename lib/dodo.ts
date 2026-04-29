import DodoPayments from "dodopayments";

export const dodoClient = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment:
    process.env.NEXT_PUBLIC_DODO_MODE === "live" ? "live_mode" : "test_mode",
});
