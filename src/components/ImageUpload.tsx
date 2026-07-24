"use client";

import { useState, useRef } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUpload({ value, onChange, label = "Imagen" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.error || "Error al subir");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-xs font-medium text-charcoal/70 mb-1">{label}</label>
      
      {value && (
        <div className="relative mb-3 rounded-lg overflow-hidden border border-sage/20 bg-sage/5">
          <img src={value} alt="Preview" className="w-full h-48 object-contain" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-white/90 text-red-500 text-xs px-2 py-1 rounded hover:bg-white transition-colors"
          >
            Eliminar
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver ? "border-sage bg-sage/5" : "border-sage/20 hover:border-sage/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleChange}
          className="hidden"
        />
        {uploading ? (
          <p className="text-xs text-charcoal/50">Subiendo...</p>
        ) : (
          <div>
            <svg className="w-8 h-8 mx-auto mb-2 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-charcoal/50">Arrastra una imagen o haz clic para seleccionar</p>
            <p className="text-[10px] text-charcoal/30 mt-1">JPG, PNG, WebP o GIF — Máx. 5MB</p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
