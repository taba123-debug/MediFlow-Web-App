"use client";

import { useId, useRef, useState } from "react";
import { FileImage, FileText, Trash2, UploadCloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FileUploadUIProps = {
  title?: string;
  description?: string;
};

const acceptedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadUI({
  title = "Upload reports or prescriptions",
  description = "Drag files here or browse from your device. PDF, JPG, PNG supported.",
}: FileUploadUIProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) {
      return;
    }

    const nextFiles = Array.from(incomingFiles);
    const invalidFile = nextFiles.find((file) => !acceptedTypes.includes(file.type));

    if (invalidFile) {
      setError("Only PDF, JPG, and PNG files are supported in this prototype.");
      return;
    }

    setError(null);
    setFiles((current) => {
      const existing = new Set(current.map((file) => `${file.name}-${file.size}`));
      const merged = [...current];

      nextFiles.forEach((file) => {
        const key = `${file.name}-${file.size}`;
        if (!existing.has(key)) {
          merged.push(file);
        }
      });

      return merged;
    });
  };

  const removeFile = (target: File) => {
    setFiles((current) =>
      current.filter(
        (file) => !(file.name === target.name && file.size === target.size),
      ),
    );
  };

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "border-dashed transition",
          isDragging && "border-sky-400 bg-sky-50/60",
        )}
      >
        <CardContent className="p-0">
          <label
            htmlFor={inputId}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              addFiles(event.dataTransfer.files);
            }}
          >
            <div className="rounded-[28px] bg-sky-50 p-6 text-sky-700">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-slate-950">{title}</p>
              <p className="mx-auto max-w-xl text-sm leading-7 text-slate-500">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  inputRef.current?.click();
                }}
              >
                Browse files
              </Button>
              <Button type="button" variant="outline">
                Demo secure upload
              </Button>
            </div>
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(event) => addFiles(event.target.files)}
            />
          </label>
        </CardContent>
      </Card>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      {files.length > 0 ? (
        <Card>
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">Selected files</p>
                <p className="text-sm text-slate-500">
                  Frontend-only preview for the upload flow.
                </p>
              </div>
              <p className="text-sm font-medium text-sky-700">{files.length} file(s)</p>
            </div>
            {files.map((file) => {
              const Icon = file.type === "application/pdf" ? FileText : FileImage;

              return (
                <div
                  key={`${file.name}-${file.size}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-rose-600"
                    aria-label={`Remove ${file.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
