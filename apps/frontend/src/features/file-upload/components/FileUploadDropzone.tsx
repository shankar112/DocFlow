import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function FileUploadDropzone() {
  const [files, setFiles] = useState<File[]>([])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []))
  }

  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6 shadow-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-md bg-slate-50 px-6 py-10 text-center transition hover:bg-slate-100">
        <span className="text-base font-semibold text-slate-950">
          Choose documents to upload
        </span>
        <span className="mt-2 text-sm text-slate-600">
          PDF, DOCX, and image uploads can be handled here.
        </span>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="sr-only"
          accept=".pdf,.doc,.docx,image/*"
        />
      </label>

      {files.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-medium text-slate-700">Selected files</h3>
          <ul className="mt-3 divide-y divide-slate-200 rounded-md border border-slate-200">
            {files.map((file) => (
              <li
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
              >
                <span className="truncate font-medium text-slate-800">{file.name}</span>
                <span className="shrink-0 text-slate-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
