import rss from "@astrojs/rss";
import type { AstroConfig } from "astro";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context: AstroConfig) {
  const blogPosts = await getCollection("blog");

  if (!context.site) throw new Error("Missing site in Astro config");

  return rss({
    title: "Derrick Yoo Online",
    description: "The personal blog of Derrick Yoo.",
    site: context.site,
    items: blogPosts.map((post) => {
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.slug}`,
        content: sanitizeHtml(parser.render(post.body)),
      };
    }),
  });
}
