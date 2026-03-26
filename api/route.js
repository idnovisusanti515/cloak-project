export default function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;
  const query = url.search;

const isFB =
  referer.includes("facebook") ||
  referer.includes("fb") ||
  ua.includes("facebook") ||
  ua.includes("meta") ||
  url.searchParams.has("fbclid");

  const VALID_SLUG = "/pusat4d-telah-melakukan-wd-1112";

  // ===== ROOT =====
  if (path === "/") {
    if (!isFB) {
      return res.writeHead(301, {
        Location: "https://www.google.com/" + query
      }).end();
    }

    return res.writeHead(302, {
      Location: VALID_SLUG + query
    }).end();
  }

  // ===== SLUG VALID =====
  if (path === VALID_SLUG) {
    return res.writeHead(302, {
      Location: "https://kocak12.pusat4daksi.org/" + query
    }).end();
  }

  // ===== SLUG LAIN (INVALID) =====
  return res.writeHead(301, {
    Location: "https://www.google.com/" + query
  }).end();
}
