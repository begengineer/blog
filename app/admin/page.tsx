'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        setAuthenticated(true);
        fetchPosts();
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`記事「${slug}」を削除しますか？`)) return;

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('記事を削除しました');
        fetchPosts();
      } else {
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('削除に失敗しました');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!authenticated || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">記事管理</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              新規作成
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイトル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日付
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タグ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="text-red-600 hover:text-red-900"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              記事がありません
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
