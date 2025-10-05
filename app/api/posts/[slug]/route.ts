import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { isAuthenticated } from '@/lib/auth';

const postsDirectory = path.join(process.cwd(), 'posts');

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET - 特定の記事取得（認証不要 - 編集画面での表示用も含む）
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({
      slug,
      ...data,
      content,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT - 記事更新（要認証）
export async function PUT(request: NextRequest, { params }: RouteParams) {
  // 認証チェック
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const { title, date, excerpt, tags, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'title and content are required' },
        { status: 400 }
      );
    }

    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const frontmatter = matter.stringify(content, {
      title,
      date: date || new Date().toISOString().split('T')[0],
      excerpt: excerpt || '',
      tags: tags || [],
    });

    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE - 記事削除（要認証）
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  // 認証チェック
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
