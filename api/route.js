
export default async function handler(req, res) {

  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);

  const isFB =
    ua.includes("facebook") ||
    ua.includes("meta") ||
    referer.includes("facebook") ||
    url.searchParams.has("fbclid");

  // ===== ROOT =====
  if (url.pathname === "/") {

    if (isFB) {
      return res.writeHead(302, {
        Location: "/pusat4d-telah-melakukan-wd-1112"
      }).end();
    }

    return res.writeHead(301, {
      Location: "https://www.google.com/"
    }).end();
  }

  // ===== SLUG =====
  if (url.pathname === "/pusat4d-telah-melakukan-wd-1112") {

    // 🔥 bikin ID random (kayak Dub)
    const cid = Math.random().toString(36).substring(2, 10);

    // 🔥 cookie tracking
    res.setHeader(
      "Set-Cookie",
      `cid=${cid}; Path=/pusat4d-telah-melakukan-wd-1112; Max-Age=3600`
    );

    // 🔥 header tambahan (biar keliatan legit)
    res.setHeader("X-Powered-By", "Dub - The Modern Link Attribution Platform");
    res.setHeader("X-Robots-Tag", "noindex");

    return res.writeHead(302, {
      Location: "https://kocak12.pusat4daksi.org"
    }).end();
  }

  // ===== FALLBACK =====
  return res.writeHead(404).end();
}
