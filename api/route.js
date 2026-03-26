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

  // ===== SLUG (HANDLER SENDIRI) =====
  if (url.pathname === "/pusat4d-telah-melakukan-wd-1112") {
    return res.writeHead(302, {
      Location: "https://kocak12.pusat4daksi.org"
    }).end();
  }

  // ===== FALLBACK =====
  return res.writeHead(404).end();
}
