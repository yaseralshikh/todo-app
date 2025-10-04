# ⚡ نشر سريع على Vercel

## 🚀 النشر في 3 خطوات

### 1. تسجيل الدخول
```bash
npx vercel login
```

### 2. تشغيل Script النشر
```bash
# على Linux/macOS
./deploy.sh

# على Windows
.\deploy.ps1
```

### 3. تشغيل Migrations
```bash
npx prisma migrate deploy
```

## ✅ تم!

التطبيق متاح الآن على: **https://todo-app-five-kappa-38.vercel.app**

---

## 📋 قائمة التحقق

- [x] Node.js 22.x في engines
- [x] أوامر build صحيحة
- [x] Prisma مُعد للـ PostgreSQL
- [x] متغيرات البيئة جاهزة
- [x] Scripts النشر جاهزة
- [x] ملف vercel.json محدث
- [x] دليل النشر الكامل

## 🔧 أوامر مفيدة

```bash
# فحص التطبيق محلياً
npm run dev

# بناء التطبيق
npm run build

# تشغيل Prisma Studio
npx prisma studio

# فحص حالة النشر
npx vercel ls
```
