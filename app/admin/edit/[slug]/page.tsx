'use client';

import { useEffect, useState } from 'react';
import PostForm from '@/components/PostForm';
import Link from 'next/link';
import { use } from 'react';

interface PostData {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export default function EditPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<PostData | null>(null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          alert('記事が見つかりません');
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        alert('記事の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="mb-4">記事が見つかりません</p>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            ← 管理画面に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            ← 管理画面に戻る
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">記事編集</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <PostForm mode="edit" initialData={post} />
        </div>
      </div>
    </div>
  );
}
