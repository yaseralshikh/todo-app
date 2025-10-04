import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth-simple';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'غير مخول' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ message: 'غير مخول' }, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}
