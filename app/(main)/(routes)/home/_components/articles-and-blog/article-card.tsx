import Link from 'next/link';

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string; // Optional image URL
}

export function ArticleCard({ slug, title, description, date, imageUrl }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          width={400}
          height={225}
          className="aspect-video w-full rounded-t-lg object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold group-hover:underline">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {date}
        </p>
      </div>
    </Link>
  );
} 