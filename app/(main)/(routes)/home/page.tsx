import { ArticlesAndBlogSection } from "./_components/articles-and-blog/articles-and-blog-section";

export default function HomePage() {
  return (
    <main>
      {/* Placeholder for other homepage content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold text-center">Welcome to My Content Detector</h1>
        <p className="text-center text-lg text-muted-foreground mt-4">
          This is a placeholder homepage. More content will be added soon.
        </p>
      </div>
      <ArticlesAndBlogSection />
      {/* Placeholder for other homepage content */}
    </main>
  );
} 