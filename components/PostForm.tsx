'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
  };
}

export default function PostForm({ mode, initialData }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    excerpt: initialData?.excerpt || '',
    tags: initialData?.tags?.join(', ') || '',
    content: initialData?.content || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const payload = {
        slug: formData.slug,
        title: formData.title,
        date: formData.date,
        excerpt: formData.excerpt,
        tags,
        content: formData.content,
      };

      const url =
        mode === 'create' ? '/api/posts' : `/api/posts/${initialData?.slug}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(mode === 'create' ? '記事を作成しました' : '記事を更新しました');
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        alert(`エラー: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('送信に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          スラッグ (URL用)
        </label>
        <input
          type="text"
          required
          disabled={mode === 'edit'}
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          placeholder="hello-world"
        />
        <p className="mt-1 text-sm text-gray-500">
          半角英数字とハイフンのみ（作成後は変更不可）
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          タイトル
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="記事のタイトル"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          日付
        </label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          概要
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={2}
          placeholder="記事の概要"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          タグ（カンマ区切り）
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="React, TypeScript, Next.js"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          本文（Markdown）
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          rows={20}
          placeholder="# 見出し&#10;&#10;本文をマークダウンで書きます。"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {submitting
            ? '送信中...'
            : mode === 'create'
            ? '作成'
            : '更新'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
