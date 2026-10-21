import Script from "next/script";

const goatCounterCode = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

/**
 * Privacy-friendly, cookieless analytics (GoatCounter).
 * Loads only in production when NEXT_PUBLIC_GOATCOUNTER_CODE is set.
 */
export default function GoatCounter() {
  if (process.env.NODE_ENV !== "production" || !goatCounterCode) {
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
