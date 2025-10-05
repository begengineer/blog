import PostForm from '@/components/PostForm';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            ← 管理画面に戻る
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">新規記事作成</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <PostForm mode="create" />
        </div>
      </div>
    </div>
  );
}
