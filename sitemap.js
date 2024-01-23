import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { routePaths } from "./src/routes.js";

const sitemapStream = new SitemapStream({
  hostname: "https://josephhansen.dev",
});

routePaths.forEach((path) => {
  sitemapStream.write({
    url: `https://josephhansen.dev${path}`,
    changefreq: "daily",
    priority: 0.3,
  });
});

sitemapStream.end();

streamToPromise(sitemapStream).then((data) => {
  createWriteStream("./public/sitemap.xml").write(data.toString());
});
