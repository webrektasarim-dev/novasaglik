"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useState, useEffect, useCallback, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingFromProps = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced onChange handler
  const handleUpdate = useCallback((html: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onChange(html);
    }, 300); // 300ms debounce
  }, [onChange]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "İçeriğinizi buraya yazın...",
      }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#14b8a6] underline hover:text-[#0d9488]',
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (!isUpdatingFromProps.current) {
        handleUpdate(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      isUpdatingFromProps.current = true;
      editor.commands.setContent(value, false); // false = don't emit update event
      // Reset flag after a short delay
      setTimeout(() => {
        isUpdatingFromProps.current = false;
      }, 100);
    }
  }, [value, editor]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Editör yükleniyor...
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-[#14b8a6] transition-colors bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bold') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Kalın"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('italic') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="İtalik"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('underline') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Altı Çizili"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('strike') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Üstü Çizili"
          >
            <s>S</s>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-sm ${
              editor.isActive('heading', { level: 1 }) ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Başlık 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-sm ${
              editor.isActive('heading', { level: 2 }) ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Başlık 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-sm ${
              editor.isActive('heading', { level: 3 }) ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Başlık 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bulletList') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Madde İşareti"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('orderedList') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Numaralı Liste"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </button>
        </div>

        {/* Blockquote */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('blockquote') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Alıntı"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        {/* Code */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('code') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Kod"
          >
            &lt;/&gt;
          </button>
        </div>

        {/* Text Align */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Sola Hizala"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Ortala"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Sağa Hizala"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* Link */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            onClick={() => {
              const url = window.prompt('Link URL\'si girin:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('link') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            }`}
            title="Link Ekle"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              // Dosya boyutu kontrolü (5MB)
              if (file.size > 5 * 1024 * 1024) {
                alert('Dosya boyutu maksimum 5MB olmalıdır');
                return;
              }

              setUploadingImage(true);

              try {
                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData
                });

                const data = await res.json();

                if (res.ok && data.url) {
                  // Görseli editor'e ekle
                  editor.chain().focus().setImage({ src: data.url }).run();
                } else {
                  alert(data.error || 'Görsel yüklenirken hata oluştu');
                }
              } catch (error) {
                console.error('Upload error:', error);
                alert('Görsel yüklenirken hata oluştu');
              } finally {
                setUploadingImage(false);
                // Input'u temizle
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              // URL ile görsel ekleme seçeneği
              const url = window.prompt('Görsel URL\'si girin veya dosya yüklemek için "Dosya" yazın:');
              if (url) {
                if (url.toLowerCase() === 'dosya' || url.toLowerCase() === 'file') {
                  fileInputRef.current?.click();
                } else {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }
            }}
            disabled={uploadingImage}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('image') ? 'bg-[#14b8a6] text-white' : 'text-gray-700'
            } ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Görsel Ekle"
          >
            {uploadingImage ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-gray-700 ${
              uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Dosyadan Görsel Yükle"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Geri Al"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Yinele"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 400px;
          padding: 16px;
          font-size: 16px;
          line-height: 1.6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .ProseMirror p {
          margin: 0.75em 0;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #14b8a6;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }
        .ProseMirror code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        .ProseMirror pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .ProseMirror pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
        .ProseMirror s {
          text-decoration: line-through;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .ProseMirror img:hover {
          opacity: 0.9;
        }
        .ProseMirror img[data-selected] {
          outline: 2px solid #14b8a6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
