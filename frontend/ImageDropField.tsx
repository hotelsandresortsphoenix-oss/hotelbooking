"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, UploadCloud } from "lucide-react";

export default function ImageDropField({
  value,
  onChange,
  authHeaders,
}: {
  value: string;
  onChange: (path: string) => void;
  authHeaders: Record<string, string>;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: authHeaders,
        body,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload nahi hui.");

      onChange(data.path);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload nahi hui.");
    } finally {
      setUploading(false);
    }
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) void uploadFile(file);
  }

  return (
    <div className="grid gap-2">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer items-center gap-4 rounded-[18px] border-2 border-dashed p-4 transition ${
          dragging
            ? "border-[#d9aa4e] bg-amber-50"
            : "border-[#ddd3c2] bg-white hover:border-[#d9aa4e]"
        }`}
      >
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="h-16 w-16 flex-shrink-0 rounded-[12px] object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#f7f1e7] text-[#b8860b]">
            <ImagePlus size={24} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {uploading ? (
            <p className="flex items-center gap-2 text-sm font-bold text-[#8a7a63]">
              <LoaderCircle size={16} className="animate-spin" /> Uploading...
            </p>
          ) : (
            <p className="flex items-center gap-2 text-sm font-bold text-[#8a7a63]">
              <UploadCloud size={16} />
              Drag and drop image, ya click karke browse karo
            </p>
          )}
          <p className="mt-1 truncate text-xs font-semibold text-[#b8860b]">
            {value || "Koi image select nahi hai"}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>

      {error && <p className="text-xs font-bold text-red-600">{error}</p>}

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/images/destinations/goa.jpg"
        className="w-full rounded-[18px] border border-[#ddd3c2] bg-white px-4 py-3 text-sm font-medium text-[#17110a] outline-none transition placeholder:text-[#9b8d78] focus:border-[#d9aa4e] focus:ring-4 focus:ring-[#d9aa4e]/20"
      />
    </div>
  );
}
