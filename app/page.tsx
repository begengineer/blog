import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-black mb-4">
            Uki Tech
          </h1>
          <p className="text-xl text-gray-700">
            日頃のなんやらを共有する初心者エンジニアのブログ
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-black mb-6">最新の記事</h2>
          <div className="grid gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {posts.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            <p>まだ記事がありません。</p>
          </div>
        )}
      </div>
    </div>
  );
}
