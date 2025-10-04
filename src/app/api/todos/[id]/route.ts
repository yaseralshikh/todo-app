import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth-simple';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'غير مخول' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ message: 'غير مخول' }, { status: 401 });
    }

    const { text, completed } = await request.json();
    const { id } = await params;

    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json(
        { message: 'المهمة غير موجودة' },
        { status: 404 }
      );
    }

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        ...(text !== undefined && { text: text.trim() }),
        ...(completed !== undefined && { completed }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'غير مخول' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ message: 'غير مخول' }, { status: 401 });
    }

    const { id } = await params;

    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json(
        { message: 'المهمة غير موجودة' },
        { status: 404 }
      );
    }

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'تم حذف المهمة بنجاح' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}
