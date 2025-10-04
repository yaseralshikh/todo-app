# ملف نشر التطبيق على Vercel - PowerShell
# Next.js + Prisma + Supabase

Write-Host "🚀 بدء عملية النشر على Vercel..." -ForegroundColor Green

# التحقق من وجود Vercel CLI
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI موجود" -ForegroundColor Green
} catch {
    Write-Host "📦 تثبيت Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# تسجيل الدخول إلى Vercel (إذا لم تكن مسجل الدخول)
Write-Host "🔐 التحقق من تسجيل الدخول إلى Vercel..." -ForegroundColor Blue
try {
    vercel whoami | Out-Null
    Write-Host "✅ تم تسجيل الدخول إلى Vercel" -ForegroundColor Green
} catch {
    Write-Host "⚠️  يرجى تسجيل الدخول إلى Vercel أولاً:" -ForegroundColor Red
    Write-Host "   npx vercel login" -ForegroundColor Yellow
    exit 1
}

# إضافة متغيرات البيئة إلى Vercel
Write-Host "🔧 إضافة متغيرات البيئة..." -ForegroundColor Blue

# إضافة DATABASE_URL
Write-Host "📊 إضافة DATABASE_URL..." -ForegroundColor Cyan
echo "postgresql://postgres:887741aZ@db.nlheflbodpictsifgaej.supabase.co:5432/postgres" | npx vercel env add DATABASE_URL production

# إضافة NEXTAUTH_URL
Write-Host "🔗 إضافة NEXTAUTH_URL..." -ForegroundColor Cyan
echo "https://todo-app-five-kappa-38.vercel.app" | npx vercel env add NEXTAUTH_URL production

# إضافة NEXTAUTH_SECRET
Write-Host "🔑 إضافة NEXTAUTH_SECRET..." -ForegroundColor Cyan
echo "mfta7h_3shw2ai_tawil_li_al_amn_2024_vercel_deployment" | npx vercel env add NEXTAUTH_SECRET production

# إضافة JWT_SECRET
Write-Host "🎫 إضافة JWT_SECRET..." -ForegroundColor Cyan
echo "production_jwt_secret_key_2024_vercel_supabase" | npx vercel env add JWT_SECRET production

# إضافة NODE_ENV
Write-Host "🌍 إضافة NODE_ENV..." -ForegroundColor Cyan
echo "production" | npx vercel env add NODE_ENV production

Write-Host "✅ تم إضافة جميع متغيرات البيئة بنجاح!" -ForegroundColor Green

# نشر التطبيق
Write-Host "🚀 بدء نشر التطبيق..." -ForegroundColor Green
npx vercel --prod

Write-Host "🎉 تم نشر التطبيق بنجاح على Vercel!" -ForegroundColor Green

# تشغيل migrations على قاعدة البيانات
Write-Host "🗄️  تشغيل Prisma migrations على قاعدة البيانات..." -ForegroundColor Blue
npx prisma migrate deploy

Write-Host "✅ تم تطبيق جميع التغييرات على قاعدة البيانات!" -ForegroundColor Green

Write-Host ""
Write-Host "🌐 يمكنك الآن الوصول إلى التطبيق على:" -ForegroundColor Cyan
Write-Host "   https://todo-app-five-kappa-38.vercel.app" -ForegroundColor Yellow
Write-Host ""
Write-Host "📊 لإدارة قاعدة البيانات:" -ForegroundColor Cyan
Write-Host "   npx prisma studio" -ForegroundColor Yellow
