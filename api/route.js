export default async function handler(req, res) {

  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;
  const query = url.search;

  const cookies = req.headers.cookie || "";

  // ===== DETEKSI =====
  const isBot =
    ua.includes("bot") ||
    ua.includes("crawl") ||
    ua.includes("spider") ||
    ua.includes("facebookexternalhit") ||
    ua.includes("meta-externalagent") ||
    ua.includes("curl");

  const isFB =
    referer.includes("facebook") ||
    url.searchParams.has("fbclid");

  // ===== SLUG LIST =====
  const SLUGS = [
    "pusat4d-telah-melakukan-wd-1112",
    "pusat4d-hari-ini-wd-88991",
    "member-pusat4d-profit-besar",
    "slot-gacor-hari-ini-2026"
  ];

  const DUB_MAP = {
    "pusat4d-telah-melakukan-wd-1112": "https://dub.sh/a1b2c3",
    "pusat4d-hari-ini-wd-88991": "https://dub.sh/d4e5f6",
    "member-pusat4d-profit-besar": "https://dub.sh/g7h8i9",
    "slot-gacor-hari-ini-2026": "https://dub.sh/j1k2l3"
  };

  // ===== ROOT =====
  if (path === "/") {

    // BOT → WHITE
    if (isBot) {
      return res.writeHead(301, {
        Location: "https://www.youtube.com/" + query
      }).end();
    }

    // NON FB → GOOGLE
    if (!isFB) {
      return res.writeHead(301, {
        Location: "https://www.google.com/" + query
      }).end();
    }

    // FB → ASSIGN SLUG
    let assigned = null;

    const match = cookies.match(/slug=([^;]+)/);
    if (match) {
      assigned = match[1];
    } else {
      assigned = SLUGS[Math.floor(Math.random() * SLUGS.length)];
    }

    return res.writeHead(302, {
      Location: "/" + assigned + query,
      "Set-Cookie": `slug=${assigned}; Path=/; Max-Age=86400`
    }).end();
  }

  // ===== HANDLE SLUG =====
  const slug = path.replace("/", "");

  if (DUB_MAP[slug]) {
    return res.writeHead(302, {
      Location: DUB_MAP[slug] + query
    }).end();
  }

  // ===== DEFAULT =====
  return res.writeHead(301, {
    Location: "https://www.google.com/"
  }).end();
}
