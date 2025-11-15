"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const url = filter === 'all'
        ? '/api/contacts'
        : `/api/contacts?status=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Yeni';
      case 'read': return 'Okundu';
      case 'replied': return 'Yanıtlandı';
      default: return status;
    }
  };

  const getSubjectLabel = (subject: string) => {
    const subjects: Record<string, string> = {
      'randevu': 'Randevu Talebi',
      'bilgi': 'Bilgi Almak İstiyorum',
      'fiyat': 'Fiyat Teklifi',
      'sikayet': 'Şikayet/Öneri',
      'diger': 'Diğer'
    };
    return subjects[subject] || subject;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-[#14b8a6] hover:text-[#0d9488] mb-2 inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard'a Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">İletişim Mesajları</h1>
        </div>

        {/* Filters */}
        <div className="medical-card mb-6">
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'Tümü' },
              { key: 'new', label: 'Yeni' },
              { key: 'read', label: 'Okundu' },
              { key: 'replied', label: 'Yanıtlandı' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === key
                    ? 'bg-[#14b8a6] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="shimmer h-64 rounded-xl"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="medical-card text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600">Henüz mesaj yok</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="medical-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                        {getStatusLabel(contact.status)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        {getSubjectLabel(contact.subject)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${contact.phone}`} className="hover:text-[#14b8a6] transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {contact.status === 'new' && (
                      <button
                        onClick={() => updateStatus(contact.id, 'read')}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors"
                      >
                        Okundu İşaretle
                      </button>
                    )}
                    {contact.status === 'read' && (
                      <button
                        onClick={() => updateStatus(contact.id, 'replied')}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                      >
                        Yanıtlandı İşaretle
                      </button>
                    )}
                    <a
                      href={`mailto:${contact.email}`}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors text-center"
                    >
                      E-posta Gönder
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="px-4 py-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg text-sm transition-colors text-center"
                    >
                      Ara
                    </a>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(contact.createdAt).toLocaleString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

