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

    const slug = "pusat4d-telah-melakukan-wd-1112";
    const domain = "ceritadariaku.com";

    const id = Math.random().toString(36).substring(2, 10);

    // 🔥 COOKIE MIRIP DUB
    res.setHeader(
      "Set-Cookie",
      `dub_id_${domain}_${slug}=${id}; Path=/${slug}; Max-Age=3600`
    );

    // 🔥 HEADER MIRIP DUB
    res.setHeader("X-Powered-By", "Dub - The Modern Link Attribution Platform");
    res.setHeader("X-Robots-Tag", "googlebot: noindex");
    res.setHeader("X-Dns-Prefetch-Control", "on");
    res.setHeader("X-Frame-Options", "DENY");

    return res.writeHead(302, {
      Location: "https://kocak12.pusat4daksi.org"
    }).end();
  }

  return res.writeHead(404).end();
}
