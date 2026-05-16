"use client";

import Script from "next/script";

/**
 * Meta Pixel initializer.
 *
 * Renders the standard Meta Pixel bootstrap snippet once per page via
 * Next.js's <Script> with `afterInteractive` strategy. Also fires
 * `PageView` automatically (Meta's recommended default).
 *
 * Injected once in app/layout.tsx so every page loads it. The custom-event
 * helpers in app/lib/meta-pixel.ts call `window.fbq` after this has run.
 *
 * If `NEXT_PUBLIC_META_PIXEL_ID` is unset, this renders nothing — useful
 * for local dev and preview branches where we don't want to pollute the
 * real Pixel with test traffic.
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;

  // The official Meta Pixel base code, lightly reformatted. Sets up the
  // fbq queue, loads fbevents.js asynchronously, then initializes the
  // pixel and fires PageView. Keep the IIFE shape — Meta's docs and a
  // good chunk of the internet recognize this exact pattern.
  const bootstrap = `
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {bootstrap}
      </Script>
      {/* No-JS fallback. Doesn't capture conversions, but at least Meta
          sees the page hit. Standard practice from Meta's docs. */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
