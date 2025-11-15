"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    published: false
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {
    fetchBlog();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        console.error('Failed to fetch categories');
        setCategories(['Genel']);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data.map((cat: any) => cat.name));
      } else {
        setCategories(['Genel']);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(['Genel']);
    }
  };

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          image: data.image || '',
          published: data.published
        });
        setImagePreview(data.image || '');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/admin/blogs');
      } else {
        alert('Blog güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, image: value }));
    setImagePreview(value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        alert(data.error || 'Görsel yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Görsel yüklenirken hata oluştu');
    } finally {
      setUploadingImage(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="shimmer w-96 h-64 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin/blogs" className="text-[#14b8a6] hover:text-[#0d9488] mb-2 inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Blog Listesine Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Blog Yazısını Düzenle</h1>
          <p className="text-gray-600 mt-2">Zengin metin editörü ile blog yazınızı güncelleyin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Category */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="medical-card">
                <label className="block text-gray-700 font-semibold mb-2">
                  📝 Blog Başlığı *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none text-lg"
                  placeholder="Blog başlığı"
                />
              </div>
            </div>

            <div>
              <div className="medical-card">
                <label className="block text-gray-700 font-semibold mb-2">
                  🏷️ Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload & URL */}
          <div className="medical-card">
            <label className="block text-gray-700 font-semibold mb-3">
              🖼️ Blog Görseli
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Dosyadan Yükle:</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#14b8a6] transition-colors ${
                      uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-[#14b8a6]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-gray-600">Yükleniyor...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-gray-600">Dosya Seç</span>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Max 5MB (JPG, PNG, GIF, WEBP)</p>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">veya URL Girin:</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2 font-semibold">📸 Görsel Önizleme:</p>
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Görsel Yolu: {formData.image}</p>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="medical-card">
            <label className="block text-gray-700 font-semibold mb-2">
              📄 Kısa Özet *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none resize-none"
              placeholder="Kısa özet"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.excerpt.length}/200 karakter
            </p>
          </div>

          {/* Rich Text Editor */}
          <div className="medical-card">
            <label className="block text-gray-700 font-semibold mb-3">
              ✍️ Blog İçeriği *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          {/* Publish Option */}
          <div className="medical-card">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                id="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-6 h-6 text-[#14b8a6] border-gray-300 rounded focus:ring-[#14b8a6]"
              />
              <label htmlFor="published" className="text-gray-700 font-medium">
                Blog yazısı yayında
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="medical-card">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-medical text-center disabled:opacity-50 text-lg py-4"
              >
                {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
              </button>
              <Link
                href="/admin/blogs"
                className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors"
              >
                İptal
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

