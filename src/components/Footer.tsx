'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Mail } from 'lucide-react';
export function Footer() {

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full max-w-6xl mx-auto px-4 py-6 mt-5"
    >
      {/* Glass morphism footer */}
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 rtl:space-x-reverse mb-4"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg">
                <Heart className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="pr-3">
                <h3 className="text-xl font-bold text-white">قائمة المهام</h3>
                <p className="text-sm text-gray-300">نظم مهامك بسهولة</p>
              </div>
            </motion.div>
            <p className="text-gray-300 mb-6 max-w-md">
              تطبيق ويب لإدارة المهام اليومية مع واجهة عصرية وتصميم متجاوب. 
              يساعدك على تنظيم مهامك وتحقيق أهدافك بفعالية.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <motion.a
                href="#"
                className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="/"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  الصفحة الرئيسية
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#features"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  المميزات
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#about"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  حول التطبيق
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#contact"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  اتصل بنا
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  href="#help"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  المساعدة
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#privacy"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  سياسة الخصوصية
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#terms"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  شروط الاستخدام
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#faq"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  الأسئلة الشائعة
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 قائمة المهام. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-300">
            <span>صُنع بـ</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-400 fill-current" />
            </motion.div>
            <span className="pr-2">باستخدام Next.js و React</span>
          </div>
        </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
