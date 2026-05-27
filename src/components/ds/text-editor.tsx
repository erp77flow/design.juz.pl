import * as React from "react";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export interface TextEditorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minHeight?: number;
  toolbarClassName?: string;
  ariaLabel?: string;
}

const TOOLBAR_COMMANDS = [
  { value: "bold", command: "bold", label: "Pogrubienie", icon: Bold },
  { value: "italic", command: "italic", label: "Kursywa", icon: Italic },
  {
    value: "underline",
    command: "underline",
    label: "Podkreślenie",
    icon: Underline,
  },
  {
    value: "ul",
    command: "insertUnorderedList",
    label: "Lista punktowana",
    icon: List,
  },
  {
    value: "ol",
    command: "insertOrderedList",
    label: "Lista numerowana",
    icon: ListOrdered,
  },
] as const;

const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      value = "",
      onValueChange,
      placeholder = "Zacznij pisać...",
      disabled,
      className,
      toolbarClassName,
      minHeight = 160,
      ariaLabel = "Edytor tekstu",
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement | null>(null);
    const composingRef = React.useRef(false);

    React.useImperativeHandle(ref, () => editorRef.current as HTMLDivElement);

    // Keep DOM in sync when controlled value changes externally.
    React.useEffect(() => {
      const el = editorRef.current;
      if (!el) return;
      if (el.innerHTML !== value) {
        el.innerHTML = value ?? "";
      }
    }, [value]);

    const exec = (command: string) => {
      if (disabled) return;
      editorRef.current?.focus();
      // execCommand is deprecated but remains the simplest path for a tiny editor.
      document.execCommand(command, false);
      const next = editorRef.current?.innerHTML ?? "";
      onValueChange?.(next);
    };

    const handleInput = () => {
      if (composingRef.current) return;
      const next = editorRef.current?.innerHTML ?? "";
      onValueChange?.(next);
    };

    return (
      <div
        className={cn(
          "overflow-hidden rounded-md border border-input bg-card shadow-juz-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "opacity-50",
          className
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-1 border-b bg-muted/40 px-2 py-1.5",
            toolbarClassName
          )}
        >
          <ToggleGroup type="multiple" size="sm" aria-label="Formatowanie">
            {TOOLBAR_COMMANDS.map((item) => {
              const Icon = item.icon;
              return (
                <ToggleGroupItem
                  key={item.value}
                  value={item.value}
                  aria-label={item.label}
                  title={item.label}
                  disabled={disabled}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    exec(item.command);
                  }}
                >
                  <Icon className="size-4" />
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
        <div
          ref={editorRef}
          role="textbox"
          aria-label={ariaLabel}
          aria-multiline
          aria-disabled={disabled || undefined}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={handleInput}
          onCompositionStart={() => {
            composingRef.current = true;
          }}
          onCompositionEnd={() => {
            composingRef.current = false;
            handleInput();
          }}
          style={{ minHeight }}
          className={cn(
            "w-full px-3 py-3 text-sm leading-relaxed text-foreground outline-hidden",
            "empty:before:pointer-events-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
            "[&_ul]:ml-6 [&_ul]:list-disc [&_ol]:ml-6 [&_ol]:list-decimal"
          )}
        />
      </div>
    );
  }
);
TextEditor.displayName = "TextEditor";

export { TextEditor };
