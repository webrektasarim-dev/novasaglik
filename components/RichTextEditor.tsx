"use client";

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// React Quill'i dynamic import ile yükle (SSR sorunlarını önlemek için)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'color', 'background',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-[#14b8a6] transition-colors">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "İçeriğinizi buraya yazın..."}
        style={{
          minHeight: '400px',
        }}
        className="bg-white"
      />
      <style jsx global>{`
        .ql-container {
          font-size: 16px;
          min-height: 400px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .ql-editor {
          min-height: 400px;
        }
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
        .ql-toolbar {
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
          padding: 12px;
        }
        .ql-toolbar .ql-stroke {
          stroke: #374151;
        }
        .ql-toolbar .ql-fill {
          fill: #374151;
        }
        .ql-toolbar button:hover,
        .ql-toolbar button:focus,
        .ql-toolbar button.ql-active {
          color: #14b8a6;
        }
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button:focus .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #14b8a6;
        }
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button:focus .ql-fill,
        .ql-toolbar button.ql-active .ql-fill {
          fill: #14b8a6;
        }
        .ql-container {
          border-top: none;
        }
      `}</style>
    </div>
  );
}
