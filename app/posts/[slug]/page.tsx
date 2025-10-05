import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800 transition"
        >
          ← 一覧に戻る
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </article>
    </div>
  );
}
