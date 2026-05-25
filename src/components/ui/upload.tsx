import * as React from "react";
import { useDropzone, type DropzoneOptions, type FileRejection } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadProps extends Omit<DropzoneOptions, "onDrop"> {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  onDropAccepted?: (files: File[]) => void;
  onDropRejected?: (rejections: FileRejection[]) => void;
  className?: string;
  hint?: React.ReactNode;
  label?: React.ReactNode;
  showFileList?: boolean;
}

const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      value,
      onValueChange,
      onDropAccepted,
      onDropRejected,
      className,
      hint = "Przeciągnij pliki tutaj lub kliknij, aby wybrać",
      label = "Dodaj pliki",
      showFileList = true,
      ...dropzoneOptions
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState<File[]>(value ?? []);
    const files = value ?? internal;

    const setFiles = (next: File[]) => {
      if (!value) setInternal(next);
      onValueChange?.(next);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      ...dropzoneOptions,
      onDrop: (accepted, rejections) => {
        const next = [...files, ...accepted];
        setFiles(next);
        onDropAccepted?.(accepted);
        if (rejections.length) onDropRejected?.(rejections);
      },
    });

    const removeFile = (file: File) => {
      setFiles(files.filter((f) => f !== file));
    };

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors",
            "hover:border-primary/60 hover:bg-primary-soft/40",
            isDragActive && "border-primary bg-primary-soft text-primary"
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className="size-8 text-muted-foreground" />
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-xs text-muted-foreground">{hint}</div>
        </div>
        {showFileList && files.length > 0 ? (
          <ul className="space-y-2">
            {files.map((file, idx) => (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm shadow-juz-sm"
              >
                <FileText className="size-4 text-muted-foreground" />
                <span className="flex-1 truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => removeFile(file)}
                  aria-label={`Usuń ${file.name}`}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);
Upload.displayName = "Upload";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export { Upload };
export type { UploadProps };
