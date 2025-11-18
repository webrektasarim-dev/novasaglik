"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MaintenancePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Giriş başarısız');
        setLoading(false);
        return;
      }

      // Redirect to admin panel
      router.push('/admin');
    } catch (err) {
      setError('Bir hata oluştu');
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/check-maintenance', {
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.maintenanceMode) {
          // Site açıldıysa anasayfaya yönlendir
          router.push('/');
        } else {
          // Hala bakım modundaysa sayfayı yenile
          window.location.reload();
        }
      } else {
        // Hata durumunda sayfayı yenile
        window.location.reload();
      }
    } catch (err) {
      console.error('Refresh error:', err);
      // Hata durumunda sayfayı yenile
      window.location.reload();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1424] via-[#0f1f34] to-[#15294a] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Maintenance Message */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Site Bakımda
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Şu anda sitemizde bakım çalışması yapılmaktadır.
          </p>
          <p className="text-lg text-gray-400">
            Yakında tekrar hizmetinizde olacağız.
          </p>
        </div>

        {/* Admin Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Girişi</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500/50 text-red-100 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-200 font-semibold mb-2 text-left">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors text-white placeholder-gray-400"
                placeholder="admin@novasaglik.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-200 font-semibold mb-2 text-left">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#14b8a6] focus:outline-none transition-colors text-white placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#0d9488] hover:to-[#059669] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>

        {/* Refresh Button */}
        <div className="mt-8">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 backdrop-blur-sm"
          >
            {refreshing ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Kontrol ediliyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Yenile
              </>
            )}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-8 text-sm">
          © 2024 Nova Sağlık Hizmetleri
        </p>
      </div>
    </div>
  );
}

