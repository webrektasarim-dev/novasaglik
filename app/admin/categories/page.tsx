"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  postCount?: number;
  createdAt: string;
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#14b8a6'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setShowAddModal(false);
        setFormData({ name: '', description: '', color: '#14b8a6' });
        fetchCategories();
      } else {
        alert(data.error || 'Kategori eklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      color: category.color
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setSaving(true);

    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setShowEditModal(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '', color: '#14b8a6' });
        fetchCategories();
      } else {
        alert(data.error || 'Kategori güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (res.ok) {
        fetchCategories();
      } else {
        alert(data.error || 'Kategori silinirken hata oluştu');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Bir hata oluştu');
    }
  };

  const predefinedColors = [
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Mavi', value: '#3b82f6' },
    { name: 'Yeşil', value: '#10b981' },
    { name: 'Mor', value: '#8b5cf6' },
    { name: 'Turuncu', value: '#f97316' },
    { name: 'Pembe', value: '#ec4899' },
    { name: 'Kırmızı', value: '#ef4444' },
    { name: 'Sarı', value: '#eab308' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-[#14b8a6] hover:text-[#0d9488] mb-2 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard'a Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Kategori Yönetimi</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-medical"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Kategori Ekle
            </span>
          </button>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="shimmer h-32 rounded-xl"></div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="medical-card text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-gray-600">Henüz kategori yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="medical-card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: category.color }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-[#14b8a6] hover:bg-teal-50 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(category.id, category.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-600 font-semibold">
                      {category.postCount || 0} yazı
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Category Modal */}
        {showEditModal && editingCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="medical-card max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Kategori Düzenle</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCategory(null);
                    setFormData({ name: '', description: '', color: '#14b8a6' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                    placeholder="Örn: Hasta Bakımı"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none resize-none"
                    placeholder="Kategori açıklaması"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Renk
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {predefinedColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`h-12 rounded-lg transition-all ${
                          formData.color === color.value
                            ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Seçili: {formData.color}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 btn-medical text-center disabled:opacity-50"
                  >
                    {saving ? 'Güncelleniyor...' : 'Kategori Güncelle'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingCategory(null);
                      setFormData({ name: '', description: '', color: '#14b8a6' });
                    }}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="medical-card max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Yeni Kategori Ekle</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                    placeholder="Örn: Hasta Bakımı"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none resize-none"
                    placeholder="Kategori açıklaması"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Renk
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {predefinedColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`h-12 rounded-lg transition-all ${
                          formData.color === color.value
                            ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Seçili: {formData.color}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 btn-medical text-center disabled:opacity-50"
                  >
                    {saving ? 'Kaydediliyor...' : 'Kategori Ekle'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

