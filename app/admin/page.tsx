"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalBlogs: 0,
    totalContacts: 0
  });
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchMaintenanceStatus();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaintenanceStatus = async () => {
    try {
      const res = await fetch('/api/admin/maintenance');
      if (res.ok) {
        const data = await res.json();
        setMaintenanceMode(data.maintenanceMode);
      }
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
    }
  };

  const toggleMaintenance = async () => {
    setMaintenanceLoading(true);
    try {
      const res = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          maintenanceMode: !maintenanceMode
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMaintenanceMode(data.maintenanceMode);
        if (data.maintenanceMode) {
          alert('Bakım modu açıldı! Site ziyaretçileri bakım sayfasını görecek.');
        } else {
          alert('Bakım modu kapatıldı! Site normale döndü.');
        }
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Bilinmeyen hata' }));
        const errorMessage = errorData.error || errorData.details || 'Bakım modu değiştirilemedi';
        alert(errorMessage);
        console.error('Maintenance toggle error:', errorData);
      }
    } catch (error) {
      console.error('Error toggling maintenance:', error);
      alert('Bir hata oluştu');
    } finally {
      setMaintenanceLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const quickActions = [
    {
      title: 'Blog Yönetimi',
      description: 'Blog yazılarını görüntüle, ekle, düzenle',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      href: '/admin/blogs',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Kategori Yönetimi',
      description: 'Blog kategorilerini ekle, düzenle, sil',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      href: '/admin/categories',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Randevu Yönetimi',
      description: 'Randevuları görüntüle ve yönet',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/admin/appointments',
      color: 'from-[#14b8a6] to-[#10b981]'
    },
    {
      title: 'İletişim Mesajları',
      description: 'Gelen mesajları görüntüle',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: '/admin/contacts',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Nova Sağlık</h1>
                <p className="text-sm text-gray-500">Admin Yönetim Paneli</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMaintenance}
                disabled={maintenanceLoading}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  maintenanceMode
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {maintenanceLoading ? '...' : maintenanceMode ? 'Siteyi Aç' : 'Siteyi Kapat'}
              </button>
              <Link href="/" className="text-gray-600 hover:text-[#14b8a6] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="medical-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Toplam Randevu</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {loading ? '...' : stats.totalAppointments}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="medical-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Bekleyen Randevu</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {loading ? '...' : stats.pendingAppointments}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="medical-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Blog Yazıları</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {loading ? '...' : stats.totalBlogs}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="medical-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Mesajlar</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {loading ? '...' : stats.totalContacts}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="medical-card card-hover-lift group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#14b8a6] transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {action.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[#14b8a6] font-semibold">
                  <span>Yönet</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

