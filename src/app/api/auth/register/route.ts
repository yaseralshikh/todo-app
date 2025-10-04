import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth-simple';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' },
        { status: 400 }
      );
    }

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: 'البريد الإلكتروني مستخدم بالفعل' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name || undefined,
      });

      return NextResponse.json(
        { message: 'تم إنشاء الحساب بنجاح', token, user: userWithoutPassword },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Fallback: Create a temporary user without database
      const tempUser = {
        id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        password: await bcrypt.hash(password, 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Generate token
      const token = generateToken({
        id: tempUser.id,
        email: tempUser.email,
        name: tempUser.name || undefined,
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = tempUser;

      return NextResponse.json(
        { 
          message: 'تم إنشاء الحساب بنجاح (وضع مؤقت - قاعدة البيانات غير متاحة)', 
          token, 
          user: userWithoutPassword,
          warning: 'هذا حساب مؤقت - سيتم فقدان البيانات عند إعادة تشغيل التطبيق'
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
