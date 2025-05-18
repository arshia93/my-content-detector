import { ArticleCard } from "./article-card";
import { getSortedArticlesData } from "@/lib/articles"; // Assuming @ is configured for src or root

export function ArticlesAndBlogSection() {
  const articles = getSortedArticlesData();

  if (!articles || articles.length === 0) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 md:mb-12">
            Articles & Blog
          </h2>
          <p>No articles found. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8 md:mb-12">
          Articles & Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              description={article.description}
              date={article.date}
              imageUrl={article.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 