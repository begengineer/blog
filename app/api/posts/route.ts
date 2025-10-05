import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { isAuthenticated } from '@/lib/auth';

const postsDirectory = path.join(process.cwd(), 'posts');

// GET - 全記事取得（認証不要 - 管理画面での表示用）
export async function GET() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          ...data,
        };
      });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - 新規記事作成（要認証）
export async function POST(request: NextRequest) {
  // 認証チェック
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, title, date, excerpt, tags, content } = await request.json();

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'slug, title, and content are required' },
        { status: 400 }
      );
    }

    const frontmatter = matter.stringify(content, {
      title,
      date: date || new Date().toISOString().split('T')[0],
      excerpt: excerpt || '',
      tags: tags || [],
    });

    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 409 }
      );
    }

    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
