"use client";

import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('blog-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'H1', onClick: () => insertFormatting('<h1>', '</h1>'), icon: 'H1' },
    { label: 'H2', onClick: () => insertFormatting('<h2>', '</h2>'), icon: 'H2' },
    { label: 'H3', onClick: () => insertFormatting('<h3>', '</h3>'), icon: 'H3' },
    { label: 'Bold', onClick: () => insertFormatting('<strong>', '</strong>'), icon: 'B' },
    { label: 'Italic', onClick: () => insertFormatting('<em>', '</em>'), icon: 'I' },
    { label: 'Link', onClick: () => insertFormatting('<a href="URL">', '</a>'), icon: '🔗' },
    { label: 'Liste', onClick: () => insertFormatting('<ul>\n  <li>', '</li>\n</ul>'), icon: '•' },
    { label: 'Paragraf', onClick: () => insertFormatting('<p>', '</p>'), icon: '¶' },
  ];

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-[#14b8a6] transition-colors">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b-2 border-gray-200 p-3 flex flex-wrap gap-2">
        {toolbarButtons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={btn.onClick}
            className="px-3 py-2 bg-white hover:bg-[#14b8a6] hover:text-white border border-gray-300 rounded-lg transition-colors text-sm font-semibold"
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${
              showPreview 
                ? 'bg-[#14b8a6] text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {showPreview ? '✍️ Düzenle' : '👁️ Önizleme'}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {showPreview ? (
        <div className="p-6 bg-white min-h-[400px] prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      ) : (
        <textarea
          id="blog-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-6 min-h-[400px] resize-none focus:outline-none font-mono text-sm"
          placeholder={placeholder || "Blog içeriğinizi HTML formatında yazın veya yukarıdaki butonları kullanın..."}
        />
      )}

      {/* Quick Reference */}
      <div className="bg-blue-50 p-4 border-t-2 border-blue-100">
        <details>
          <summary className="text-sm text-blue-800 font-semibold cursor-pointer">
            📚 HTML Etiket Rehberi
          </summary>
          <div className="mt-3 text-xs text-blue-700 grid grid-cols-2 md:grid-cols-4 gap-2">
            <code className="bg-white p-2 rounded">&lt;h1&gt;Başlık 1&lt;/h1&gt;</code>
            <code className="bg-white p-2 rounded">&lt;p&gt;Paragraf&lt;/p&gt;</code>
            <code className="bg-white p-2 rounded">&lt;strong&gt;Kalın&lt;/strong&gt;</code>
            <code className="bg-white p-2 rounded">&lt;em&gt;İtalik&lt;/em&gt;</code>
            <code className="bg-white p-2 rounded">&lt;ul&gt;&lt;li&gt;Liste&lt;/li&gt;&lt;/ul&gt;</code>
            <code className="bg-white p-2 rounded">&lt;a href="URL"&gt;Link&lt;/a&gt;</code>
            <code className="bg-white p-2 rounded">&lt;img src="URL" /&gt;</code>
            <code className="bg-white p-2 rounded">&lt;br /&gt; (Satır)</code>
          </div>
        </details>
      </div>
    </div>
  );
}

