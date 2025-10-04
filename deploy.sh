#!/bin/bash

# ملف نشر التطبيق على Vercel
# Next.js + Prisma + Supabase

echo "🚀 بدء عملية النشر على Vercel..."

# التحقق من وجود Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 تثبيت Vercel CLI..."
    npm install -g vercel
fi

# تسجيل الدخول إلى Vercel (إذا لم تكن مسجل الدخول)
echo "🔐 التحقق من تسجيل الدخول إلى Vercel..."
vercel whoami || {
    echo "⚠️  يرجى تسجيل الدخول إلى Vercel أولاً:"
    echo "   npx vercel login"
    exit 1
}

# إضافة متغيرات البيئة إلى Vercel
echo "🔧 إضافة متغيرات البيئة..."

# إضافة DATABASE_URL
echo "📊 إضافة DATABASE_URL..."
npx vercel env add DATABASE_URL production << EOF
postgresql://postgres:887741aZ@db.nlheflbodpictsifgaej.supabase.co:5432/postgres
EOF

# إضافة NEXTAUTH_URL
echo "🔗 إضافة NEXTAUTH_URL..."
npx vercel env add NEXTAUTH_URL production << EOF
https://todo-app-five-kappa-38.vercel.app
EOF

# إضافة NEXTAUTH_SECRET
echo "🔑 إضافة NEXTAUTH_SECRET..."
npx vercel env add NEXTAUTH_SECRET production << EOF
mfta7h_3shw2ai_tawil_li_al_amn_2024_vercel_deployment
EOF

# إضافة JWT_SECRET
echo "🎫 إضافة JWT_SECRET..."
npx vercel env add JWT_SECRET production << EOF
production_jwt_secret_key_2024_vercel_supabase
EOF

# إضافة NODE_ENV
echo "🌍 إضافة NODE_ENV..."
npx vercel env add NODE_ENV production << EOF
production
EOF

echo "✅ تم إضافة جميع متغيرات البيئة بنجاح!"

# نشر التطبيق
echo "🚀 بدء نشر التطبيق..."
npx vercel --prod

echo "🎉 تم نشر التطبيق بنجاح على Vercel!"

# تشغيل migrations على قاعدة البيانات
echo "🗄️  تشغيل Prisma migrations على قاعدة البيانات..."
npx prisma migrate deploy

echo "✅ تم تطبيق جميع التغييرات على قاعدة البيانات!"

echo ""
echo "🌐 يمكنك الآن الوصول إلى التطبيق على:"
echo "   https://todo-app-five-kappa-38.vercel.app"
echo ""
echo "📊 لإدارة قاعدة البيانات:"
echo "   npx prisma studio"
