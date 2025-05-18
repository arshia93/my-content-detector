import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content/blog');

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  contentHtml?: string;
}

function getArticleFileNames(): string[] {
  try {
    const allFiles = fs.readdirSync(articlesDirectory);
    return allFiles.filter(
      (filename) => (filename.endsWith('.md') || filename.endsWith('.mdx')) && !filename.startsWith('.')
    );
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.warn("[lib/articles] The 'content/blog' directory does not exist. No articles will be loaded.");
    } else {
      console.warn('[lib/articles] Could not read articles directory for filenames:', error);
    }
    return [];
  }
}

export function getSortedArticlesData(): Article[] {
  const filenames = getArticleFileNames();
  if (filenames.length === 0) return [];

  const allArticlesData = filenames.map((filename): Article | null => {
    try {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (!data.title || !data.date || !data.description || !data.imageUrl) {
        console.warn(`[lib/articles] Article '${filename}' is missing required frontmatter. Skipping.`);
        return null;
      }
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        imageUrl: data.imageUrl as string,
      };
    } catch (parseError) {
      console.warn(`[lib/articles] Error parsing frontmatter for article '${filename}'. Skipping.`, parseError);
      return null;
    }
  }).filter(article => article !== null) as Article[];

  return allArticlesData.sort((a, b) => {
    try {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn(`[lib/articles] Invalid date in articles: '${a.slug}' or '${b.slug}'.`);
        return 0;
      }
      return dateB.getTime() - dateA.getTime();
    } catch (dateError) {
      console.warn(`[lib/articles] Error comparing dates for articles: '${a.slug}' and '${b.slug}'.`, dateError);
      return 0;
    }
  });
}

export function getAllArticleSlugs() {
  const filenames = getArticleFileNames();
  if (filenames.length === 0) return [];
  return filenames.map((filename) => ({
    slug: filename.replace(/\.(md|mdx)$/, ''),
  }));
}

export async function getArticleData(slug: string): Promise<Article | null> {
  const filenames = getArticleFileNames();
  const filename = filenames.find(name => name.startsWith(slug + '.'));

  if (!filename) {
    console.warn(`[lib/articles] No .md or .mdx file found for slug: ${slug}`);
    return null;
  }

  const fullPath = path.join(articlesDirectory, filename);
  console.log(`[lib/articles] Reading article from: ${fullPath}`);

  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    console.error(`[lib/articles] Article file not found at path: ${fullPath}`, err);
    return null;
  }

  try {
    const { data: frontmatter, content: markdownBody } = matter(fileContents);
    // console.log(`[lib/articles] Slug: ${slug} - Frontmatter:`, frontmatter); // Uncomment for deep debug
    // console.log(`[lib/articles] Slug: ${slug} - Markdown body before remark: <<<${markdownBody.substring(0,100)}...>>>`);


    if (!frontmatter.title || !frontmatter.date || !frontmatter.description || !frontmatter.imageUrl) {
      console.warn(`[lib/articles] Article with slug '${slug}' is missing required frontmatter.`);
      return null;
    }

    const processedContent = await remark().use(html).process(markdownBody);
    const contentHtml = processedContent.toString();
    // console.log(`[lib/articles] Slug: ${slug} - Processed HTML: <<<${contentHtml.substring(0,100)}...>>>`);

    if (contentHtml.trim().startsWith('---')) {
        console.error(`[lib/articles] Slug: ${slug} - CRITICAL: Processed HTML appears to contain frontmatter. Markdown body was: <<<${markdownBody.substring(0,100)}...>>>`);
    }

    return {
      slug,
      title: frontmatter.title as string,
      date: frontmatter.date as string,
      description: frontmatter.description as string,
      imageUrl: frontmatter.imageUrl as string,
      contentHtml,
    };
  } catch (processingError) {
    console.error(`[lib/articles] Error processing markdown or frontmatter for slug '${slug}':`, processingError);
    return null;
  }
} 