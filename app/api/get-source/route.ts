import { NextResponse, NextRequest } from 'next/server';

// 强制告诉 Vercel 这是一个动态路由，不要在构建时静态化
export const dynamic = 'force-dynamic'; 

export async function GET(request: NextRequest) {
  const referer = request.headers.get('referer');
  // 只允许你自己的域名（例如 mkvideo.vercel.app）访问
  if (!referer || !referer.includes("v.movie.us.kg")) {
    return new NextResponse(JSON.stringify({ error: "Object not found" }), { status: 404 });
  }

  try {
    const secretData = process.env.MYSOURCES;
    if (!secretData) {
      return NextResponse.json({ error: "Missing Env" }, { status: 500 });
    }
    return NextResponse.json(JSON.parse(secretData));
  } catch (e) {
    return NextResponse.json({ error: "JSON Error" }, { status: 500 });
  }
}