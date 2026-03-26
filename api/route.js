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
        Location: "https://ceritadariaku.com/pusat4d-telah-melakukan-wd-1112"
      }).end();
    }

    return res.writeHead(301, {
      Location: "https://www.google.com/"
    }).end();
  }

  // ===== SLUG → DUB =====
  if (url.pathname === "/pusat4d-telah-melakukan-wd-1112") {
    return res.writeHead(302, {
      // GANTI ini dengan link Dub lo
      Location: "https://ceritadariaku.com/pusat4d-telah-melakukan-wd-1112"
    }).end();
  }

  // fallback
  return res.writeHead(404).end();
}
