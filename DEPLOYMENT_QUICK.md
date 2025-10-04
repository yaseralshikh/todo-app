# 🚀 دليل النشر السريع على Vercel

## ⚡ النشر في 5 دقائق

### 1. رفع المشروع إلى GitHub

```bash
# إنشاء repository جديد على GitHub
git init
git add .
git commit -m "Initial commit: Todo App ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/todo-app.git
git push -u origin main
```

### 2. النشر على Vercel

1. **اذهب إلى [vercel.com](https://vercel.com)**
2. **سجل الدخول بحساب GitHub**
3. **اضغط "New Project"**
4. **اختر repository المشروع**
5. **اضغط "Import"**

### 3. إعداد متغيرات البيئة

في Vercel Dashboard → Project Settings → Environment Variables:

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-for-production
NODE_ENV=production
```

### 4. إعداد قاعدة البيانات

**خيار سريع: Vercel Postgres**
1. Vercel Dashboard → Storage → Create Database → Postgres
2. انسخ connection string
3. أضفه كـ `DATABASE_URL`

### 5. تشغيل Migration

```bash
# في Vercel Dashboard → Functions
# أو استخدم Vercel CLI
npx vercel env pull .env.local
npx prisma db push
```

## ✅ تم! المشروع متاح على Vercel

---

## 🔧 استكشاف الأخطاء السريع

### خطأ في البناء؟
```bash
npm run build
npm run type-check
npm run lint
```

### خطأ في قاعدة البيانات؟
```bash
npx prisma generate
npx prisma db push
```

### خطأ في المصادقة؟
- تحقق من `JWT_SECRET` (يجب أن يكون 32+ حرف)
- تحقق من `DATABASE_URL`

## 📞 الدعم

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**ملاحظة**: تأكد من اختبار التطبيق في بيئة الإنتاج قبل الإطلاق النهائي.
