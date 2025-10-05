import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-300">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-2xl font-bold text-black hover:text-gray-600 transition mb-3">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 text-sm mb-3">{post.date}</p>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-black text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/posts/${post.slug}`}
        className="inline-block mt-4 text-black hover:text-gray-600 font-semibold transition"
      >
        続きを読む →
      </Link>
    </article>
  );
}
