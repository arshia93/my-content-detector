import { getArticleData, getAllArticleSlugs, Article } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { Nav } from "@/components/Nav";
import { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head'; // Import Head for structured data

// Helper function to format dates safely
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // console.warn(`Invalid date string received: ${dateString}`);
      return "Date not available";
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) {
    // console.error(`Error formatting date string: ${dateString}`, e);
    return "Date not available";
  }
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  if (slugs.length === 0) {
    return [];
  }
  return slugs;
}

// Define types for params
type ResolvedPageParams = {
  slug: string;
};
type PromisedPageParams = Promise<ResolvedPageParams>;

// This interface might need adjustment or can be replaced by inline types in function signatures
// For now, we'll keep it but primarily focus on the function signatures.
interface BlogArticlePageProps {
  params: PromisedPageParams; // Updated to reflect promise
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params: paramsPromise }: { params: PromisedPageParams }, // Use the new PromisedPageParams type
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await paramsPromise; // Await the params
  const article = await getArticleData(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: 'AdlyDetector Team' }], // Replace with actual author
    // publishedTime: new Date(article.date).toISOString(), // Ensure date is valid before calling toISOString
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      type: 'article',
      // publishedTime: new Date(article.date).toISOString(),
      // authors: ['AdlyDetector Team'],
      images: article.imageUrl ? [
        {
          url: article.imageUrl, 
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : [],
    },
    twitter: { 
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.imageUrl ? [article.imageUrl] : [], 
    },
  };
}

export default async function ArticlePage({ params: paramsPromise }: { params: PromisedPageParams }) { // Use the new PromisedPageParams type
  const { slug } = await paramsPromise; // Await the params
  const article = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.imageUrl, 
    datePublished: new Date(article.date).toISOString(), // Ensure date is valid
    author: {
      '@type': 'Organization', // Or 'Person'
      name: 'AdlyDetector Team', // Replace with actual author
    },
    description: article.description,
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
                {article.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Published on: {formatDate(article.date)}
              </p>
            </header>

            {article.imageUrl && (
              <figure className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={article.imageUrl}
                  alt={`Cover image for ${article.title}`}
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] object-cover"
                  width={1200} 
                  height={675} 
                />
              </figure>
            )}

            <div
              className="prose dark:prose-invert lg:prose-xl max-w-none mx-auto"
              dangerouslySetInnerHTML={{ __html: article.contentHtml || "<p>Content not available.</p>" }}
            />
          </article>
        </main>
      </div>
    </>
  );
}
