export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published: string;
  thumbnail: string;
  author: string;
  slug: string;
  category: string;
}

/**
 * Generates a URL-friendly slug from a string.
 */
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')               // Separate accents from letters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, '-')            // Replace spaces with -
    .replace(/[^\w-]+/g, '')         // Remove all non-word chars
    .replace(/--+/g, '-')            // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
};

export const parseBloggerXML = (xmlString: string): BlogPost[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const entries = xmlDoc.getElementsByTagName("entry");
  const posts: BlogPost[] = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    
    // Blogger XML contains meta entries that aren't posts (like settings)
    const linkElement = Array.from(entry.getElementsByTagName("link")).find(
      (l) => l.getAttribute("rel") === "alternate" && l.getAttribute("type") === "text/html"
    );

    if (!linkElement) continue;

    const id = entry.getElementsByTagName("id")[0]?.textContent || "";
    const title = entry.getElementsByTagName("title")[0]?.textContent || "Untitled";
    const content = entry.getElementsByTagName("content")[0]?.textContent || "";
    const published = entry.getElementsByTagName("published")[0]?.textContent || "";
    const author = entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent || "Anonymous";
    const category = entry.getElementsByTagName("category")[0]?.getAttribute("term") || "Gaming";
    
    let thumbnail = "";
    const imgMatch = content.match(/<img[^>]+src=\\"([^\\">]+)\\"/);
    if (imgMatch) {
      thumbnail = imgMatch[1];
    } else {
      thumbnail = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60";
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const excerpt = tempDiv.textContent?.substring(0, 120).trim() + "..." || "";

    // Generate permanent, perfect permalink based on title
    const titleSlug = slugify(title);
    // Ensure we have a slug, otherwise fallback to Blogger ID or sequence
    const slug = titleSlug || id.split("-").pop() || `post-${i}`;

    posts.push({ id, title, content, excerpt, published, thumbnail, author, slug, category });
  }

  // Sort by published date descending
  return posts.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
};