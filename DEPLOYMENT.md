# دليل النشر على Vercel

## 📋 المتطلبات

- حساب Vercel (مجاني)
- حساب GitHub (لربط المشروع)
- Node.js 18+ 
- npm 8+

## 🚀 طرق النشر

### الطريقة الأولى: النشر عبر GitHub (مستحسن)

#### 1. رفع المشروع إلى GitHub

```bash
# إنشاء repository جديد على GitHub
# ثم رفع المشروع
git init
git add .
git commit -m "Initial commit: Todo App with Next.js 15.5.4"
git branch -M main
git remote add origin https://github.com/yourusername/todo-app.git
git push -u origin main
```

#### 2. ربط المشروع بـ Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول بحساب GitHub
3. اضغط "New Project"
4. اختر repository المشروع
5. اضغط "Import"

#### 3. إعداد متغيرات البيئة

في Vercel Dashboard:
1. اذهب إلى Project Settings
2. اختر "Environment Variables"
3. أضف المتغيرات التالية:

```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-for-production
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-for-production
NODE_ENV=production
```

#### 4. إعداد قاعدة البيانات

**خيار 1: Vercel Postgres (مستحسن)**
1. في Vercel Dashboard، اذهب إلى Storage
2. اختر "Create Database" → "Postgres"
3. انسخ connection string
4. أضفه كـ `DATABASE_URL` في Environment Variables

**خيار 2: قاعدة بيانات خارجية**
- استخدم PlanetScale, Supabase, أو أي خدمة PostgreSQL أخرى

#### 5. تشغيل Migration

```bash
# في Vercel Dashboard، اذهب إلى Functions
# أو استخدم Vercel CLI
npx vercel env pull .env.local
npx prisma db push
```

### الطريقة الثانية: النشر عبر Vercel CLI

#### 1. تثبيت Vercel CLI

```bash
npm i -g vercel
```

#### 2. تسجيل الدخول

```bash
vercel login
```

#### 3. النشر

```bash
# النشر الأول
vercel

# النشرات التالية
vercel --prod
```

#### 4. إعداد متغيرات البيئة

```bash
# إضافة متغيرات البيئة
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add NODE_ENV
```

## ⚙️ إعدادات الإنتاج

### 1. قاعدة البيانات

```bash
# إنشاء migration للإنتاج
npx prisma migrate deploy

# أو push مباشر
npx prisma db push
```

### 2. متغيرات البيئة المطلوبة

```env
# قاعدة البيانات
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"

# NextAuth (اختياري)
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-nextauth-secret"

# البيئة
NODE_ENV="production"
```

### 3. إعدادات Vercel

في `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## 🔧 استكشاف الأخطاء

### مشاكل شائعة:

#### 1. خطأ في قاعدة البيانات
```bash
# تحقق من DATABASE_URL
echo $DATABASE_URL

# تشغيل Prisma
npx prisma generate
npx prisma db push
```

#### 2. خطأ في البناء
```bash
# تحقق من TypeScript
npm run type-check

# تحقق من ESLint
npm run lint

# بناء محلي
npm run build
```

#### 3. خطأ في المتغيرات
```bash
# تحقق من المتغيرات في Vercel
vercel env ls
```

## 📊 مراقبة الأداء

### 1. Vercel Analytics
- تفعيل Analytics في Vercel Dashboard
- مراقبة الأداء والأخطاء

### 2. Logs
```bash
# عرض logs
vercel logs

# مراقبة logs في الوقت الفعلي
vercel logs --follow
```

## 🔄 التحديثات

### تحديث المشروع:
```bash
# سحب التحديثات
git pull origin main

# بناء محلي للاختبار
npm run build

# النشر
git push origin main
# أو
vercel --prod
```

### تحديث قاعدة البيانات:
```bash
# إنشاء migration جديد
npx prisma migrate dev --name update-schema

# تطبيق في الإنتاج
npx prisma migrate deploy
```

## 🛡️ الأمان

### 1. متغيرات حساسة
- لا تضع secrets في الكود
- استخدم Environment Variables
- استخدم Vercel Secrets

### 2. قاعدة البيانات
- استخدم SSL connections
- قم بتحديث كلمات المرور بانتظام
- استخدم connection pooling

### 3. JWT
- استخدم secrets قوية (32+ حرف)
- قم بتحديث secrets بانتظام
- استخدم HTTPS فقط

## 📈 تحسين الأداء

### 1. Next.js
- استخدم Static Generation حيثما أمكن
- استخدم Image Optimization
- استخدم Code Splitting

### 2. قاعدة البيانات
- استخدم Indexes
- استخدم Connection Pooling
- مراقبة Query Performance

### 3. Vercel
- استخدم Edge Functions
- استخدم CDN
- مراقبة Bundle Size

## 🆘 الدعم

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## ✅ قائمة التحقق قبل النشر

- [ ] المشروع يعمل محلياً
- [ ] `npm run build` ينجح
- [ ] `npm run lint` ينجح
- [ ] قاعدة البيانات متصلة
- [ ] متغيرات البيئة محددة
- [ ] JWT_SECRET قوي
- [ ] HTTPS مفعل
- [ ] Analytics مفعل
- [ ] Error monitoring مفعل

---

**ملاحظة**: تأكد من اختبار التطبيق في بيئة الإنتاج قبل الإطلاق النهائي.
