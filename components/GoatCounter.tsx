import Script from "next/script";

/** Site code from https://janwalenda.goatcounter.com — override via env if needed. */
const goatCounterCode =
  process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "janwalenda";

/**
 * Privacy-friendly, cookieless analytics (GoatCounter).
 * Loads only in production.
 */
export default function GoatCounter() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${goatCounterCode}.goatcounter.com/count`}
      strategy="afterInteractive"
    />
  );
}
