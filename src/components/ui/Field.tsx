import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (a: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
};

/**
 * Wires a label, hint and error message to a control by id.
 *
 * Taking the input as a render prop means the ARIA plumbing (`aria-invalid`,
 * `aria-describedby` pointing at whichever of hint/error exists) is computed in
 * one place instead of being hand-repeated - and hand-repeated is where it
 * silently drifts out of sync.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-flame" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-[0.8125rem] font-normal text-muted">
            optional
          </span>
        )}
      </label>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {hint ? (
        <p id={hintId} className="text-[0.8125rem] text-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-[0.8125rem] font-medium text-flame">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared control styling so inputs, selects and textareas stay identical. */
export const controlClass =
  "w-full rounded-[10px] border border-hairline bg-surface px-4 py-3 text-[1rem] text-ink " +
  "transition-colors duration-200 placeholder:text-muted/80 " +
  "hover:border-muted/50 focus:border-flame " +
  "aria-[invalid=true]:border-flame aria-[invalid=true]:bg-blush/40";
