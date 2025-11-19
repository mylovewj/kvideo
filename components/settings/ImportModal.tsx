'use client';

import { useState, useRef, useEffect } from 'react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (jsonString: string) => boolean;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const isValid = onImport(content);
        
        if (isValid) {
          setSuccess(true);
          setError('');
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1500);
        } else {
          setError('导入失败：文件格式无效');
          setSuccess(false);
        }
      } catch {
        setError('导入失败：无法读取文件');
        setSuccess(false);
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/30 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 z-[9999] w-[90%] max-w-md -translate-x-1/2 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 -translate-y-1/2 scale-100' 
            : 'opacity-0 -translate-y-[40%] scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-md)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[var(--text-color)]">
              导入设置
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)] transition-all duration-200"
              aria-label="关闭"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <p className="text-[var(--text-color-secondary)] text-sm mb-4">
              选择之前导出的设置文件（JSON 格式）
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={success}
              className="w-full px-6 py-4 rounded-[var(--radius-2xl)] bg-[var(--glass-bg)] border-2 border-dashed border-[var(--glass-border)] text-[var(--text-color)] font-medium hover:bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)] hover:border-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>点击选择文件</span>
              </div>
            </button>

            {error && (
              <div className="mt-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-[var(--radius-2xl)] px-4 py-3">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-[var(--radius-2xl)] px-4 py-3 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                导入成功！正在刷新页面...
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            disabled={success}
            className="w-full px-6 py-3 rounded-[var(--radius-2xl)] bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-color)] font-semibold hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)] disabled:opacity-50 transition-all duration-200"
          >
            取消
          </button>
        </div>
      </div>
    </>
  );
}
