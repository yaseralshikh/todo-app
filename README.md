# 📝 تطبيق إدارة المهام

تطبيق ويب حديث لإدارة المهام اليومية مبني باستخدام **Next.js 15.5.4** و **React 19.2.0** مع تصميم عصري وتأثيرات تفاعلية جميلة.

## ✨ المميزات

- 🎨 **تصميم عصري**: Glass Morphism مع خلفية بتدرج بنفسجي أزرق
- 🌙 **وضع ليلي/نهاري**: تبديل سهل بين الأوضاع
- 🔐 **نظام مصادقة**: تسجيل دخول وخروج آمن
- 📱 **متجاوب**: يعمل على جميع الأجهزة
- ⚡ **سريع**: محسن للأداء باستخدام Next.js 15
- 🎭 **تأثيرات تفاعلية**: Framer Motion للحركات السلسة
- 💾 **حفظ البيانات**: قاعدة بيانات مع Prisma
- 🌍 **دعم العربية**: واجهة باللغة العربية مع RTL

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 15.5.4, React 19.2.0, TypeScript
- **Styling**: TailwindCSS 4, Framer Motion
- **Database**: Prisma ORM, SQLite (Development), PostgreSQL (Production)
- **Authentication**: JWT, bcryptjs
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 البدء السريع

### المتطلبات

- Node.js 18+
- npm 8+

### التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp env.example .env.local
```

4. **تحديث ملف .env.local**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

5. **إعداد قاعدة البيانات**
```bash
npm run db:generate
npm run db:push
```

6. **تشغيل التطبيق**
```bash
npm run dev
```

7. **فتح التطبيق**
```
http://localhost:3000
```

## 📁 هيكل المشروع

```
todo-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   ├── auth/           # صفحات المصادقة
│   │   ├── settings/       # صفحة الإعدادات
│   │   └── page.tsx        # الصفحة الرئيسية
│   ├── components/         # مكونات React
│   │   ├── AuthProvider.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── TodoItem.tsx
│   │   └── ...
│   ├── hooks/              # Custom Hooks
│   │   ├── useAuth.ts
│   │   ├── useTodos.ts
│   │   └── useTheme.ts
│   └── lib/                # Utilities
│       ├── auth-simple.ts
│       ├── types.ts
│       └── utils.ts
├── prisma/                 # Prisma Schema
├── public/                 # Static Files
├── vercel.json            # Vercel Configuration
├── next.config.ts         # Next.js Configuration
└── package.json           # Dependencies
```

## 🎨 التصميم

### الألوان
- **الخلفية**: تدرج بنفسجي أزرق (`from-indigo-600 via-purple-600 to-purple-700`)
- **النصوص**: أبيض ورمادي
- **الأزرار**: Indigo و Purple
- **الروابط**: Cyan

### التأثيرات
- **Glass Morphism**: `bg-black/20 backdrop-blur-lg`
- **Hover Effects**: Scale و Color transitions
- **Animations**: Framer Motion للحركات السلسة

## 🔧 الأوامر المتاحة

```bash
# التطوير
npm run dev              # تشغيل في وضع التطوير
npm run build            # بناء للإنتاج
npm run start            # تشغيل في وضع الإنتاج

# الجودة
npm run lint             # فحص الكود
npm run lint:fix         # إصلاح أخطاء الكود
npm run type-check       # فحص TypeScript

# قاعدة البيانات
npm run db:generate      # توليد Prisma Client
npm run db:push          # تطبيق Schema
npm run db:migrate       # إنشاء Migration
npm run db:studio        # فتح Prisma Studio
```

## 🚀 النشر على Vercel

### الطريقة الأولى: عبر GitHub

1. **رفع المشروع إلى GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/todo-app.git
git push -u origin main
```

2. **ربط بـ Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - Import من GitHub
   - أضف متغيرات البيئة

3. **إعداد قاعدة البيانات**
   - استخدم Vercel Postgres أو قاعدة بيانات خارجية
   - أضف `DATABASE_URL` في Environment Variables

### الطريقة الثانية: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# إضافة متغيرات البيئة
vercel env add DATABASE_URL
vercel env add JWT_SECRET
```

## 📊 متغيرات البيئة

### التطوير (.env.local)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
NODE_ENV="development"
```

### الإنتاج (Vercel)
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-production-nextauth-secret"
NODE_ENV="production"
```

## 🛡️ الأمان

- **JWT**: مصادقة آمنة مع tokens
- **bcrypt**: تشفير كلمات المرور
- **HTTPS**: مفعل في الإنتاج
- **Headers**: أمان إضافي في next.config.ts

## 📈 الأداء

- **Next.js 15**: محسن للأداء
- **Turbopack**: بناء سريع
- **Code Splitting**: تحميل تدريجي
- **Image Optimization**: تحسين الصور
- **Static Generation**: صفحات ثابتة

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في قاعدة البيانات**
```bash
npm run db:generate
npm run db:push
```

2. **خطأ في البناء**
```bash
npm run type-check
npm run lint
npm run build
```

3. **خطأ في المصادقة**
- تحقق من `JWT_SECRET`
- تحقق من `DATABASE_URL`

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للbranch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 الدعم

- **GitHub Issues**: [إنشاء issue جديد](https://github.com/yourusername/todo-app/issues)
- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Vercel Docs**: [Vercel Documentation](https://vercel.com/docs)

## 🙏 شكر وتقدير

- [Next.js](https://nextjs.org/) - React Framework
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Prisma](https://www.prisma.io/) - Database ORM
- [Vercel](https://vercel.com/) - Deployment Platform

---

**صُنع بـ ❤️ باستخدام Next.js و React**