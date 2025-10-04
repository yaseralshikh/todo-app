# 📋 دليل النشر الكامل - Next.js + Prisma + Supabase على Vercel

## 🎯 نظرة عامة
هذا الدليل يوضح كيفية نشر تطبيق Next.js مع Prisma و Supabase على Vercel.

## ✅ المتطلبات المكتملة

### 1. إعدادات Node.js
- ✅ Node.js 22.x محدد في `package.json`
- ✅ npm 10.x محدد في `package.json`

### 2. أوامر Build المحدثة
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "db:migrate:deploy": "prisma migrate deploy"
  }
}
```

### 3. إعدادات Prisma
- ✅ تم تغيير provider من `sqlite` إلى `postgresql`
- ✅ قاعدة البيانات جاهزة للعمل مع Supabase

### 4. متغيرات البيئة
تم إعداد المتغيرات التالية:
- `DATABASE_URL`: رابط قاعدة بيانات Supabase PostgreSQL
- `NEXTAUTH_URL`: رابط التطبيق على Vercel
- `NEXTAUTH_SECRET`: مفتاح أمان NextAuth
- `JWT_SECRET`: مفتاح JWT للإنتاج
- `NODE_ENV`: بيئة الإنتاج

## 🚀 خطوات النشر

### الطريقة الأولى: استخدام Scripts الجاهزة

#### على Linux/macOS:
```bash
chmod +x deploy.sh
./deploy.sh
```

#### على Windows (PowerShell):
```powershell
.\deploy.ps1
```

### الطريقة الثانية: النشر اليدوي

#### 1. تثبيت Vercel CLI
```bash
npm install -g vercel
```

#### 2. تسجيل الدخول إلى Vercel
```bash
npx vercel login
```

#### 3. إضافة متغيرات البيئة
```bash
# إضافة DATABASE_URL
npx vercel env add DATABASE_URL production
# أدخل: postgresql://postgres:887741aZ@db.nlheflbodpictsifgaej.supabase.co:5432/postgres

# إضافة NEXTAUTH_URL
npx vercel env add NEXTAUTH_URL production
# أدخل: https://todo-app-five-kappa-38.vercel.app

# إضافة NEXTAUTH_SECRET
npx vercel env add NEXTAUTH_SECRET production
# أدخل: mfta7h_3shw2ai_tawil_li_al_amn_2024_vercel_deployment

# إضافة JWT_SECRET
npx vercel env add JWT_SECRET production
# أدخل: production_jwt_secret_key_2024_vercel_supabase

# إضافة NODE_ENV
npx vercel env add NODE_ENV production
# أدخل: production
```

#### 4. نشر التطبيق
```bash
npx vercel --prod
```

#### 5. تشغيل Migrations
```bash
npx prisma migrate deploy
```

## 🔧 إعدادات إضافية

### ملف vercel.json
تم إنشاء ملف `vercel.json` مع الإعدادات المطلوبة:
```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install && prisma generate"
}
```

### إعدادات Prisma للبيئة الإنتاج
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🌐 النتائج المتوقعة

بعد النشر الناجح، سيكون التطبيق متاحاً على:
- **الرابط**: https://todo-app-five-kappa-38.vercel.app
- **قاعدة البيانات**: Supabase PostgreSQL
- **المصادقة**: NextAuth.js مع Supabase

## 🔍 التحقق من النشر

### 1. فحص التطبيق
- افتح الرابط في المتصفح
- تأكد من عمل جميع الوظائف

### 2. فحص قاعدة البيانات
```bash
npx prisma studio
```

### 3. فحص logs في Vercel
- اذهب إلى Vercel Dashboard
- اختر المشروع
- انقر على "Functions" لمراجعة logs

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة وحلولها:

#### 1. خطأ في Prisma Client
```bash
npx prisma generate
```

#### 2. خطأ في Migrations
```bash
npx prisma migrate reset
npx prisma migrate deploy
```

#### 3. خطأ في متغيرات البيئة
- تأكد من إضافة جميع المتغيرات في Vercel Dashboard
- تحقق من صحة القيم

#### 4. خطأ في Build
```bash
npm run build
```

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع logs في Vercel Dashboard
2. تأكد من صحة متغيرات البيئة
3. تحقق من إعدادات Supabase

---

**🎉 تهانينا! تم إعداد ملف النشر الكامل بنجاح!**
