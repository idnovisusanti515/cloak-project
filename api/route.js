export default function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const referer = (req.headers["referer"] || "").toLowerCase();
  const url = new URL(req.url, `https://${req.headers.host}`);

  const isFB =
    referer.includes("facebook") ||
    url.searchParams.has("fbclid");

  if (url.pathname === "/") {
    if (!isFB) {
      return res.writeHead(301, {
        Location: "https://www.google.com/"
      }).end();
    }

    return res.writeHead(302, {
      Location: "/pusat4d-telah-melakukan-wd-1112"
    }).end();
  }

  // selain root → biarin lanjut
  return res.status(200).end("OK");
}
